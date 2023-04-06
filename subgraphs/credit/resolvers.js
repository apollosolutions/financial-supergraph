import { CREDITS, APPLICATIONS } from "./data.js";

const getCreditById = (id) => CREDITS.find((it) => it.id === id);
const getApplicationsById = (id) => APPLICATIONS.find(it => it.id === id);

export const resolvers = {
  Query: {
    credits: () => CREDITS
  },
  Mutation: {
    applyForCredit: (_, args) => ({
      message: "Mutations are mocked in this demo. No changes were actually made",
      success: true,
      application: {
        ...getApplicationsById("creditapplication:1"),
        yearlyEarnings: args.yearlyEarnings,
        totalDebt: args.totalDebt,
        monthlyExpenses: args.monthlyExpenses
      }
    }),
  },
  Credit: {
    __resolveReference(ref) {
      return getCreditById(ref.id);
    }
  },
  CreditCardApplication: {
    __resolveReference(ref) {
      return getApplicationsById(ref.id);
    }
  }
};
