import React from 'react';
import Routes from './router/Rooter';
import { Provider } from "react-redux"
import { persistor, store } from "./store"
import { PersistGate } from 'redux-persist/es/integration/react';
import { RootSiblingParent } from 'react-native-root-siblings';
import { NativeModules, StatusBar } from 'react-native';
import actions from './store/actions';

const App = () => {

  NativeModules.RNToolsManager.getAppVersion((version) => {
    console.log(version);
    store.dispatch(actions.setVersion(version))
  })
    ; (async function () {
      const res = await NativeModules.RNToolsManager.promiseMethod("22")
      console.log(res);

    })()


  return (
    <Provider store={store}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <PersistGate loading={null} persistor={persistor}>
        <RootSiblingParent>
          <Routes />
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  )
};


export default App;
