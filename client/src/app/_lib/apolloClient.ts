import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors }) => {
  const isUnauthorised = graphQLErrors?.find((e) =>
    e.message.includes("Unauthorised")
  );

  if (isUnauthorised) {
    try {
      window.sessionStorage?.clear();
      window.location.href = "/";
      window.sessionStorage.setItem("expired", "true");
    } catch {
      return;
    }
  }
});

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_BACKEND_URI,
  credentials: "same-origin",
});

const authLink = setContext((_, { headers }) => {
  let token;
  try {
    token = window.sessionStorage?.getItem("token");
  } catch {
    return {};
  }
  return {
    headers: {
      ...headers,
      Authorization: token ?? "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(ApolloLink.from([errorLink, httpLink])),
  cache: new InMemoryCache(),
});

export default client;
