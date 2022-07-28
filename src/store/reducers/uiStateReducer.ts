import produce from 'immer'
import type { Action } from '../actions'
import type { NativeData } from './../../typings/index'

export interface UIState {
  nativeData: NativeData
}
export const initialState: Readonly<UIState> = {
  nativeData: {
    aa: '1',
  },
}

export default (originalState = initialState, action: Action) =>
  produce(originalState, (state) => {
    switch (action.type) {
      case 'setNativeData':
        state.nativeData = action.payload
    }
  })
