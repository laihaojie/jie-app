
import { DataState } from 'src/store/reducers/dataStateReducer';
import { UIState } from 'src/store/reducers/uiStateReducer';
import { App, UserInfo } from './index';


export type AccountStore = {
  userinfo: UserInfo
  apps: App[],
  token: string
}


export interface ReduxState {
  uiState: UIState;
  dataState: DataState;
}
