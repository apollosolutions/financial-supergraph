import { TRANSACTIONS } from "./data.js";

export const getTransactionById = (id) => TRANSACTIONS.find((it) => it.id === id);

export const resolvers = {
  Query: {
    transactions: () => TRANSACTIONS
  },
  Transaction: {
    __resolveReference(ref) {
      return getTransactionById(ref.id);
    }
  },
};
