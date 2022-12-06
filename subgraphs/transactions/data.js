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
    id: "account:1",
  },
  {
    id: "account:2",
    accountId: "account:1",
    name: "Transaction One"
  },
  {
    id: "transaction:2",
    accountId: "account:2",
    name: "Transaction Two"
  },
];
