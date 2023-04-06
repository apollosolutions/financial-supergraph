import { ACCOUNTS } from "./data.js";

export const getAccountById = (id) => ACCOUNTS.find((it) => it.id === id);
export const getAccountsByUserId = (userId) => ACCOUNTS.filter((it) => it.user.id === userId);

const CHECKING_ACCOUNTS = ACCOUNTS.filter(it => it.type === "CHECKING");
const SAVINGS_ACCOUNTS = ACCOUNTS.filter(it => it.type === "SAVINGS");

export const resolvers = {
  Query: {
    bankAccounts: () => ({})
  },
  Mutation: {
    openCheckingAccount: () => ({
      message: "Mutations are mocked in this demo. No account was created",
      success: true,
      account: CHECKING_ACCOUNTS[0]
    }),
    openSavingsAccount: () => ({
      message: "Mutations are mocked in this demo. No account was created",
      success: true,
      account: SAVINGS_ACCOUNTS[0]
    })
  },
  AllBankAccounts: {
    all: () => ACCOUNTS,
    checking: () => CHECKING_ACCOUNTS,
    savings: () => SAVINGS_ACCOUNTS
  },
  BankAccount: {
    __resolveReference(ref) {
      return getAccountById(ref.id);
    }
  },
  User: {
    accounts: (parent) => getAccountsByUserId(parent.id)
  }
};
