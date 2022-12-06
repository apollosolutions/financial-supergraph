import { start as accounts } from "@apollosolutions/financial-supergraph-accounts/server.js";
import { start as credit } from "@apollosolutions/financial-supergraph-credit/server.js";
import { start as transactions } from "@apollosolutions/financial-supergraph-transactions/server.js";
import { start as users } from "@apollosolutions/financial-supergraph-users/server.js";
import { start as gateway } from "@apollosolutions/financial-supergraph-gateway/server.js";

const LOCAL_SUBGRAPH_CONFIG = [
  {
    name: "accounts",
    port: 4001
  },
  {
    name: "credit",
    port: 4002
  },
  {
    name: "transactions",
    port: 4003
  },
  {
    name: "users",
    port: 4004
  }
];

const getLocalPort = (subgraphName) =>
  LOCAL_SUBGRAPH_CONFIG.find(it => it.name === subgraphName).port;

(async () => {
  // start all subgraphs
  await Promise.all([
    accounts(getLocalPort('accounts')),
    credit(getLocalPort('credit')),
    transactions(getLocalPort('transactions')),
    users(getLocalPort('users')),
  ]);

  // wait 1s, needed for Stackblitz to load
  await new Promise((r) => setTimeout(r, 1000));

  // start gateway
  await gateway(4000, LOCAL_SUBGRAPH_CONFIG);
})();
