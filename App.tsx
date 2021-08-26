/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React, { useEffect, useRef } from 'react';
import { Alert, Button, SafeAreaView, ScrollView } from 'react-native';
import {
  useProductsCatalogLazyQuery,
  useProductsCatalogLazyQueryRaw,
} from './src/request';
import { useApolloClient } from '@apollo/client';

const App = () => {
  const client = useApolloClient();
  const [query, { data, loading }] = useProductsCatalogLazyQuery({
    fetchPolicy: 'network-only',
  });
  const [rawQuery, { data: dataRaw, loading: loadingRaw }] =
    useProductsCatalogLazyQueryRaw(client);

  const startRef = useRef<Date>();
  useEffect(() => {
    if (loading || loadingRaw) {
      startRef.current = new Date();
      return;
    }

    if (data || dataRaw) {
      Alert.alert(
        `Started: ${startRef.current?.toISOString()} Ended: ${new Date().toISOString()}`,
      );
    }
  }, [loading, loadingRaw, data, dataRaw]);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Button
          title="Request With Apollo"
          disabled={loading || loadingRaw}
          onPress={() => query()}
        />
        <Button
          title="Request Without Apollo"
          disabled={loading || loadingRaw}
          onPress={() => rawQuery()}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
