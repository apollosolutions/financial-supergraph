import { ACCOUNTS, TRANSACTIONS } from "./data.js";

export const getTransactionById = (id) => TRANSACTIONS.find((it) => it.id === id);
export const getAccountById = (id) => ACCOUNTS.find((it) => it.id === id);
export const getTransactionsByAccountId = (accountId) => TRANSACTIONS.filter((it) => it.accountId === accountId);

export const resolvers = {
  Query: {
    transactions: () => ({})
  },
  TransactionsResponse: {
    transactions: () => TRANSACTIONS,
  },
  BankAccount: {
    transactions: (parent) => getTransactionsByAccountId(parent.id)
  },
  Transaction: {
    __resolveReference(ref) {
      console.log('resolving Transaction reference', ref.id);
      return getTransactionById(ref.id);
    }
  },
  CheckingAccount: {
    __resolveReference(ref) {
      console.log('resolving CheckingAccount reference', ref.id);
      return getAccountById(ref.id);
    },
    transactions(account) {
      console.log('resolving CheckingAccount transactions', account.id);
      return TRANSACTIONS.filter((it) => it.account === account.id);
    }
  },
};
