import { ACCOUNTS, USERS } from "./data.js";

export const getUserById = (id) => USERS.find((it) => it.id === id);
export const getAccountById = (id) => ACCOUNTS.find((it) => it.id === id);

export const resolvers = {
  Query: {
    users: () => USERS
  },
  User: {
    __resolveReference(ref) {
      console.log('resolving User reference', ref.id);
      return getUserById(ref.id);
    }
  },
  CheckingAccount: {
    __resolveReference(ref) {
      console.log('resolving CheckingAccount reference', ref.id);
      return getAccountById(ref.id);
    },
    user(account) {
      return getUserById(account.user);
    }
  },
  SavingsAccount: {
    __resolveReference(ref) {
      console.log('resolving SavingsAccount reference', ref.id);
      return getAccountById(ref.id);
    },
    user(account) {
      return getUserById(account.user);
    }
  }
};
