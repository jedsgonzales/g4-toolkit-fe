import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { AuthState } from "src/redux/authSlice";
import { loadStorageObject } from "src/utils/storage";

const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_GRAPH_API}`,
  // credentials: 'same-origin', // for same server API
  credentials: "omit",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const auth: AuthState["data"] = loadStorageObject("auth");

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: auth?.token ? `Bearer ${auth?.token}` : undefined,
      "apollo-require-preflight": true,
    },
  };
});

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  const isUnathorized: boolean =
    graphQLErrors?.reduce<boolean>((p, c) => {
      return c.extensions?.code === "UNAUTHORIZED" || p;
    }, false) || false;

  if (isUnathorized) {
    window.location.href = "/login";
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);

    if (networkError.message === "Unauthorized") {
      window.location.href = "/login";
    }
  }
});

export const apolloClient = new ApolloClient({
  /* uri: `${process.env.APOLLO_API_SERVER}`, */
  cache: new InMemoryCache(),
  link: from([errorLink, authLink, httpLink]),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});
