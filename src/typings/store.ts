import type { DataState } from 'src/store/reducers/dataStateReducer'
import type { UIState } from 'src/store/reducers/uiStateReducer'
import type { App, UserInfo } from './index'

export interface AccountStore {
  userinfo: UserInfo
  apps: App[]
  token: string
}

export interface ReduxState {
  uiState: UIState
  dataState: DataState
}
