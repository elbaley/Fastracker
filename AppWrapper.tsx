import React from 'react';
import {StatusBar} from 'react-native';
import store, {persistor} from './src/app/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import App from './App';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar backgroundColor="#292931" barStyle="light-content" />
        <App />
      </PersistGate>
    </Provider>
  );
};

export default AppWrapper;
