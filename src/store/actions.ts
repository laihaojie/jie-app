
import { ActionValue, createAction, createActions, NoArgAction, ToggleAction, } from 'redux-type-actions';
import { UserInfo } from 'src/typings';


const actions = createActions({
  // Data
  setUser: createAction<UserInfo>(),
  setToken: createAction<string>(),
  logout: NoArgAction,
  setVersion: createAction<string>(),
  clearAll: NoArgAction,
});

export type Action = ActionValue<typeof actions>;

export default actions;
