const MAX_RISK_SCORE = 100;

export const resolvers = {
  User: {
    riskRating: () => Math.floor(Math.random() * MAX_RISK_SCORE)
  },
};
