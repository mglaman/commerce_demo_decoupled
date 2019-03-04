import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const graphqlClient = new ApolloClient({
    link: new HttpLink({
        uri: `${process.env.REACT_APP_API_URL}/graphql`
    }),
    cache: new InMemoryCache(),
});

