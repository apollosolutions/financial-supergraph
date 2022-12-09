import { CREDITCARDS } from "./data.js";

export const getCreditById = (id) => CREDITCARDS.find((it) => it.id === id);

export const resolvers = {
  Query: {
    creditcards: () => ({})
  },
  Credit: {
    __resolveReference(ref) {
      return getCreditById(ref.id);
    }
  },
};
