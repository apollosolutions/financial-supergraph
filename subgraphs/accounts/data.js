export const ACCOUNTS = [
  {
    __typename: "CheckingAccount",
    id: "account:1",
    name: "Account One",
    type: "CHECKING",
    tier: "PREMIUM",
    user: "user:1",
  },
  {
    __typename: "SavingsAccount",
    id: "account:2",
    name: "Account Two",
    type: "SAVINGS",
    tier: "BASIC",
    user: "user:1"
  },
];

export const TRANSACTIONS = [
  {
    id: "transaction:1",
    account: "account:1"
  },
  {
    id: "transaction:2",
    account: "account:1",
  },
  {
    id: "transaction:3",
    account: "account:2"
  },
  {
    id: "transaction:4",
    account: "account:2"
  },
];