import { CREDITS } from "./data.js";

export const getCreditById = (id) => CREDITS.find((it) => it.id === id);

export const resolvers = {
  Query: {
    credits: () => CREDITS
  },
  Credit: {
    __resolveReference(ref) {
      return getCreditById(ref.id);
    }
  },
};
