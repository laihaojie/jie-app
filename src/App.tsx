import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/es/integration/react'
import { RootSiblingParent } from 'react-native-root-siblings'
import { StatusBar } from 'react-native'
import Routes from './router/Rooter'
import { persistor, store } from './store'

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar translucent={true} backgroundColor="#2196F3" />
      <PersistGate loading={null} persistor={persistor}>
        <RootSiblingParent>
          <Routes />
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  )
}

export default App
