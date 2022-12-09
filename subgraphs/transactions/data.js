export const TRANSACTIONS = [
  {
    id: "transaction:1",
    amount: 10,
    account: "account:1"
  },
  {
    id: "transaction:2",
    amount: 20,
    account: "account:1",
  },
  {
    id: "transaction:3",
    amount: 30,
    account: "account:2"
  },
  {
    id: "transaction:4",
    amount: 40,
    account: "account:2"
  },
];

export const ACCOUNTS = [
  {
    __typename: "CheckingAccount",
    id: "account:1",
  },
  {
    __typename: "SavingsAccount",
    id: "account:2",
  },
];
