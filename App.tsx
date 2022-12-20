import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import configureStore from './app/Redux/Store';
import { PersistGate } from 'redux-persist/es/integration/react';
import Root from 'app/navigation';
import NetInfo from "@react-native-community/netinfo";
import ErrorMessage from 'app/components/ErrorMessage';
import { BLACK_COLOR, GREEN_COLOR } from 'app/components/utilities/constant';

const App = () => {
  const { persistor, store } = configureStore();
  const [isConnect, setisConnec] = useState<any>(false)
  useEffect(() => {
    const unsubscribe: any = NetInfo.addEventListener(state => {
      setisConnec(state.isConnected)
      if (!state.isConnected) {
        ErrorMessage({
          msg: 'No Connection',
          backgroundColor: BLACK_COLOR
        })
      }
    });

    return () => {
      unsubscribe()
    }
  }, [])
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  )
};

export default App;
