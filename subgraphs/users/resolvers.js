import { USERS } from "./data.js";

export const getUserById = (id) => USERS.find((it) => it.id === id);

export const resolvers = {
  Query: {
    users: () => USERS
  },
  User: {
    __resolveReference(ref) {
      console.log('resolving User reference', ref.id);
      return getUserById(ref.id);
    },
    accounts: (parent) => getUserById(parent.id).accounts
  }
};
