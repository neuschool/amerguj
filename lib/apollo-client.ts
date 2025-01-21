import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  uri: "https://graphql.contentful.com/content/v1/spaces/" + process.env.CONTENTFUL_SPACE_ID,
  headers: {
    authorization: `Bearer ${process.env.CONTENTFUL_DELIVERY}`,
  },
});

export function getClient() {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
} 