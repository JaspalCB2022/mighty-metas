/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import React from 'react';
import AppRoute from './src/routes';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <SafeAreaProvider>
          <AppRoute />
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
