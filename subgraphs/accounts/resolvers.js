import { ACCOUNTS, TRANSACTIONS } from "./data.js";

export const getAccountById = (id) => ACCOUNTS.find((it) => it.id === id);
export const getTransactionById = (id) => TRANSACTIONS.find((it) => it.id === id);

export const resolvers = {
  Query: {
    bankAccounts: () => ({}),
  },
  BankAccountsResponse: {
    all: () => ACCOUNTS,
    checking: () => ACCOUNTS.filter((it) => it.type === "CHECKING"),
    savings: () => ACCOUNTS.filter((it) => it.type === "SAVINGS"),
  },
  BankAccount: {
    __resolveReference(ref) {
      console.log('resolving BankAccount reference', ref.id);
      return getAccountById(ref.id);
    }
  },
  Transaction: {
    __resolveReference(ref) {
      console.log('resolving Transaction reference', ref.id);
      return getTransactionById(ref.id);
    },
    account(transaction) {
      console.log('resolving Transaction account', transaction.id);
      return getAccountById(transaction.account);
    } 
  },
};
