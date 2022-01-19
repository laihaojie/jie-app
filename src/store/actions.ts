import { NativeData } from './../typings/index';
import { ActionValue, createAction, createActions, NoArgAction, StringAction, ToggleAction, } from 'redux-type-actions';
import { UserInfo } from 'src/typings';


const actions = createActions({
  // Data
  setUser: createAction<UserInfo>(),
  setToken: StringAction,
  logout: NoArgAction,
  setVersion: StringAction,
  setAccount: StringAction,
  clearAll: NoArgAction,
  // UI
  setNativeData: createAction<NativeData>(),
});

export type Action = ActionValue<typeof actions>;

export default actions;
