import { RISK } from "./data.js";

export const getUserById = (id) => RISK.find((it) => it.id === id);

export const resolvers = {
  User: {
    __resolveReference(ref) {
      return getUserById(ref.id);
    },
  },
};
