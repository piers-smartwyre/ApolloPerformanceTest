import { ApolloClient, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

const link = new RestLink({
  uri: 'http://localhost:3000',
});

export default new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Product: {
        keyFields: ['product_id'],
      },
    },
  }),
  link,
});
