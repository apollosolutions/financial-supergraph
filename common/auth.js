/*
 * This logic and code was implemented from the following resources:
 *   - https://www.apollographql.com/docs/apollo-server/security/authentication/#with-custom-directives
 *   - https://the-guild.dev/graphql/tools/docs/schema-directives#enforcing-access-permissions
 */

import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { defaultFieldResolver } from "graphql";

// The header we parse to get the current role
export const USER_HEADER = "x-user-role";

// The order of roles is important here as higher roles have bigger indexes
// and determine the order of hierarchy.
const ROLES = ['UNKNOWN', 'USER', 'PARTNER', 'ADMIN'];

/**
 * Transform the schema resolvers for every field or object that has the @auth directive.
 * If the directive is present, first check that the header matches the required role,
 * then call the resolver as normal.
 */
const authDirective = (directiveName, getUserFn) => {
  const typeDirectiveArgumentMaps = {};
  return {
    authDirectiveTransformer: (schema) =>
      mapSchema(schema, {
        [MapperKind.TYPE]: type => {
          const authDirective = getDirective(schema, type, directiveName)?.[0];
          if (authDirective) {
            typeDirectiveArgumentMaps[type.name] = authDirective;
          }
          return undefined;
        },
        [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
          const authDirective =
            getDirective(schema, fieldConfig, directiveName)?.[0] ?? typeDirectiveArgumentMaps[typeName];
          if (authDirective) {
            const { requires } = authDirective;
            if (requires) {
              const { resolve = defaultFieldResolver } = fieldConfig;
              fieldConfig.resolve = function (source, args, context, info) {
                const user = getUserFn(context.headers[USER_HEADER]);
                if (!user.hasRole(requires)) {
                  throw new Error(`Not authorized. Please include the header "${USER_HEADER}" with a valid role.`);
                }
                return resolve(source, args, context, info);
              }
              return fieldConfig;
            }
          }
        }
      })
  }
};

/**
 * This function is where you could do more advanced logic to parse a token, validate it,
 * and check the user's permissions against the schema roles. For simplicity in the demo,
 * we just accept the raw value from the header as the role.
 */
const getUserPermissions = headerRole => ({
  hasRole: (schemaRole) => {
    const headerIndex = ROLES.indexOf(headerRole);
    const schemaIndex = ROLES.indexOf(schemaRole);
    return schemaIndex >= 0 && headerIndex >= schemaIndex;
  }
});

export const { authDirectiveTransformer } = authDirective('auth', getUserPermissions);
