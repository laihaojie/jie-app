import type { ActionValue } from 'redux-type-actions'
import { NoArgAction, StringAction, createAction, createActions } from 'redux-type-actions'
import type { UserInfo } from 'src/typings'
import type { NativeData } from './../typings/index'

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
})

export type Action = ActionValue<typeof actions>

export default actions
