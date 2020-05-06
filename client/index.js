import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import RoutingApp from "./modules/RoutingApp.js";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql/",
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <RoutingApp />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
