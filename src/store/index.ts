import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";
import dataStateReducer from "./reducers/dataStateReducer";
import uiStateReducer from "./reducers/uiStateReducer";
import { selectToken } from "./selectors";

// export interface StoreState {
//   AccountReducer: AccountStore
// }

export const reducer = combineReducers({
  uiState: uiStateReducer,
  dataState: persistReducer(
    {
      key: 'dataState',
      storage: AsyncStorage,
      blacklist: ['location'],
    },
    dataStateReducer,
  ),
})

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['dataState'],
  },
  reducer
)


export const store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store);

export function getToken() {
  return selectToken(store.getState());
}
