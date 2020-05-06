import fetch from "node-fetch";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { ApolloProvider } from "@apollo/react-common";
import { getDataFromTree } from "@apollo/react-ssr";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { StaticRouter } from "react-router";
import { InMemoryCache } from "apollo-cache-inmemory";

import RoutingApp from "../client/modules/RoutingApp";

import Express from "express";

const app = new Express();
const port = process.env.PORT || 3000;

function Html({ content, state }) {
  return (
    <html lang="en">
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
              /</g,
              "\\u003c"
            )};`,
          }}
        />
      </body>
    </html>
  );
}

app.get("/*", (req, res) => {
  const client = new ApolloClient({
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    link: createHttpLink({
      uri: "http://localhost:8000/graphql/",
      credentials: "include",
      headers: {
        cookie: req.header("Cookie"),
      },
      fetch: fetch,
    }),
    cache: new InMemoryCache(),
  });

  const context = {};

  const App = (
    <ApolloProvider client={client}>
      <StaticRouter context={context} location={req.url}>
        <RoutingApp />
      </StaticRouter>
    </ApolloProvider>
  );

  getDataFromTree(App).then(() => {
    const content = ReactDOMServer.renderToString(App);
    const initialState = client.extract();
    const html = <Html content={content} state={initialState} />;
    res.status(200);
    res.send(`<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(html)}`);
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
