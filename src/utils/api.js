import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory';

import introspectionQueryResultData from './fragmentTypes.json';

const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData
});

export const graphqlClient = new ApolloClient({
    cache: new InMemoryCache({ fragmentMatcher }),
    link: new HttpLink({
        uri: `${process.env.REACT_APP_API_URL}/graphql`
    }),
});

