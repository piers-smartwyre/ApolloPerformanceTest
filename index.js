/**
 * @format
 */

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import client from './src/apollo-client';

AppRegistry.registerComponent(appName, () => () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
});
