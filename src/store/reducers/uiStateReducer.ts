import produce from 'immer';

export interface UIState { }
export const initialState: Readonly<UIState> = {};

export default (originalState = initialState, action) =>
  produce(originalState, state => {
    switch (action.type) {
    }
  });
