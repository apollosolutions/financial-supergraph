import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { authDirectiveTransformer } from "@apollosolutions/simple-auth-directive";
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getUsersSchema } from './users/subgraph.js';
import { getAccountsSchema } from './accounts/subgraph.js';
import { getCreditSchema } from './credit/subgraph.js';
import { getTransactionsSchema } from './transactions/subgraph.js';
import { getRiskSchema } from './risk/subgraph.js';

export const LOCAL_SUBGRAPH_CONFIG = [
  {
    name: 'accounts',
    schema: getAccountsSchema()
  },
  {
    name: 'credit',
    schema: getCreditSchema()
  },
  {
    name: 'transactions',
    schema: getTransactionsSchema()
  },
  {
    name: 'users',
    schema: getUsersSchema()
  },
  {
    name: 'risk',
    schema: getRiskSchema(),
  },
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
    const server = new ApolloServer({
      schema: authDirectiveTransformer(subgraphConfig.schema),
      // For a real subgraph introspection should be disabled, for the demo we have left on
      introspection: true,
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
