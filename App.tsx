import React from 'react';
import Route from './app/navigation';
import 'react-native-gesture-handler';
import { ToastProvider } from 'react-native-toast-notifications'
import { SafeAreaView } from 'react-native';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './app/Redux/Store';

const App = () => {
  const { persistor, store} = configureStore();
  return (
    // <SafeAreaView style={{ flex: 1 }}>
    //   <ToastProvider>
    //     <Route />
    //   </ToastProvider>
    // </SafeAreaView>

    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Route />
      </PersistGate>
    </Provider>
  )
};

export default App;
