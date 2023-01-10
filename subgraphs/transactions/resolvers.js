import { TRANSACTIONS } from "./data.js";

export const getTransactionById = (id) => TRANSACTIONS.find((it) => it.id === id);
export const getTransactionsByAccountId = (accountId) => TRANSACTIONS.filter((it) => it.account.id === accountId);

export const resolvers = {
  Query: {
    transactions: () => TRANSACTIONS
  },
  BankAccount: {
    transactions: (parent) => getTransactionsByAccountId(parent.id),
    balance: (parent) => {
      const transactions = getTransactionsByAccountId(parent.id);
      return transactions.map(it => it.amount).reduce((sum, next) => sum + next, 0)
    }
  },
  Transaction: {
    __resolveReference(ref) {
      return getTransactionById(ref.id);
    }
  },
};
