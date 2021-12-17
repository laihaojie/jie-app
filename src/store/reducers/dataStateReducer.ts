import produce from 'immer';
import { UserInfo } from 'src/typings';
import { Action } from '../actions';


export interface DataState {
  user?: UserInfo;
  token: string;
  version: string;
}
export const initialState: Readonly<DataState> = {
  token: '',
  version: '',
};

export default (originalState = initialState, action: Action) =>
  produce(originalState, (state) => {
    switch (action.type) {
      case 'setUser':
        state.user = action.payload;
        return;
      case 'setToken':
        state.token = action.payload
        return;
      case 'setVersion':
        state.version = action.payload
        return;
      case 'logout':
        state.user = undefined;
        state.token = '';
        return;
      case 'clearAll':
        state.user = undefined;
        state.token = '';
        state.version = '';
        return;
    }
  });
