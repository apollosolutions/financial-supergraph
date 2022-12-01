import { ACCOUNTS } from "./data.js";

export const getAccountById = (id) => ACCOUNTS.find((it) => it.id === id);

export const resolvers = {
  Query: {
    accounts: () => ACCOUNTS
  },
  Account: {
    __resolveReference(ref) {
      return getAccountById(ref.id);
    }
  },
};
