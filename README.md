# Server Side Rendered React App calling GraphQL API

## Quickstart

To get set up, first have Node.js and [Yarn](https://classic.yarnpkg.com/en/)
installed. Then, in your cloned repository:

```
yarn install
yarn run dev:server  # starts the express server on localhost:3000 (hopefully)
```

Alternatively, to serve just the client (no SSR):

```
yarn run dev:client  # starts server on localhost:1234
```


## Parts

- [Parcel](https://parceljs.org/) builds the React app and Express server (see
  `package.json` for the build jobs).
- [React](https://reactjs.org/) is the front-end framework.
- [Apollo Client](https://www.apollographql.com/docs/react/) is the GraphQL
  client and [Apollo
  Boost](https://www.apollographql.com/docs/react/get-started/#apollo-boost) is
  the batteries-included set of packages for Apollo Client.
- [Express](https://expressjs.com/) is the webserver that renders our React page
  on the server side.
