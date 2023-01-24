
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

const createApolloClient = () => {
  const link = new HttpLink({
    uri: "/api/graphql",
  });

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
};

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={createApolloClient()}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
