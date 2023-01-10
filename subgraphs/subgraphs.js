import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getUsersSchema } from './users/subgraph.js';
import { getAccountsSchema } from './accounts/subgraph.js';
import { getCreditSchema } from './credit/subgraph.js';
import { getTransactionsSchema } from './transactions/subgraph.js';

export const LOCAL_SUBGRAPH_CONFIG = [
  {
    name: 'accounts',
    getSchema: getAccountsSchema
  },
  {
    name: 'credit',
    getSchema: getCreditSchema
  },
  {
    name: 'transactions',
    getSchema: getTransactionsSchema
  },
  {
    name: 'users',
    getSchema: getUsersSchema
  }
];

const getLocalSubgraphConfig = (subgraphName) =>
  LOCAL_SUBGRAPH_CONFIG.find(it => it.name === subgraphName);

export const startSubgraphs = async (httpPort) => {
  // Create a monolith express app for all subgraphs
  const app = express();
  const httpServer = http.createServer(app);
  const serverPort = process.env.PORT ?? httpPort;

  // Run each subgraph on the same http server, but at different paths
  for (const subgraph of LOCAL_SUBGRAPH_CONFIG) {
    const subgraphConfig = getLocalSubgraphConfig(subgraph.name);
    const schema = subgraphConfig.getSchema();
    const server = new ApolloServer({
      schema,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    });

    await server.start();

    const path = `/${subgraphConfig.name}/graphql`;
    app.use(
      path,
      cors(),
      bodyParser.json(),
      expressMiddleware(server, {
        context: async ({ req }) => ({ headers: req.headers })
      })
    );

    console.log(`Setting up [${subgraphConfig.name}] subgraph at http://localhost:${serverPort}${path}`);
  }

  // Start entire monolith at given port
  await new Promise((resolve) => httpServer.listen({ port: serverPort }, resolve));
};
