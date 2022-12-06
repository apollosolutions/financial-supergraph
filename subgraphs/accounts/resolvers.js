import { ACCOUNTS } from "./data.js";

export const getAccountById = (id) => ACCOUNTS.find((it) => it.id === id);

export const resolvers = {
  Query: {
    bankAccounts: () => ({})
  },
  BankAccountsResponse: {
    all: () => ACCOUNTS,
    checking: () => ACCOUNTS.filter(it => it.type === "CHECKING"),
    savings: () => ACCOUNTS.filter(it => it.type === "SAVINGS")
  },
  BankAccount: {
    __resolveReference(ref) {
      return getAccountById(ref.id);
    }
  },
};
