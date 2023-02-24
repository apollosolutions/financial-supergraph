import { USERS } from "./data.js";
import { GraphQLError } from "graphql";

export const getUserById = (id) => USERS.find((it) => it.id === id);

export const resolvers = {
  Query: {
    users: () => USERS,
    user(_, __, context) {
      const userId = context.headers["x-user-id"];
      const user = getUserById(userId);

      if (!user) {
        throw new GraphQLError("Could not locate user by id. Please specify a valid `x-user-id` header like `user:1`");
      }

      return user;
    },
  },
  User: {
    __resolveReference(ref) {
      return getUserById(ref.id);
    }
  }
};
