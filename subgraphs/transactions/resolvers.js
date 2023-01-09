import { ACCOUNTS, TRANSACTIONS } from "./data.js";

export const getTransactionById = (id) => TRANSACTIONS.find((it) => it.id === id);
export const getAccountById = (id) => ACCOUNTS.find((it) => it.id === id);
export const getTransactionsByAccountId = (accountId) => TRANSACTIONS.filter((it) => it.accountId === accountId);

export const resolvers = {
  Query: {
    transactions: () => TRANSACTIONS
  },
  BankAccount: {
    transactions: (parent) => getTransactionsByAccountId(parent.id)
  },
  Transaction: {
    __resolveReference(ref) {
      return getTransactionById(ref.id);
    }
  },
};
