import { createSelector } from 'reselect';
import { ReduxState } from 'src/typings/store';


export const selectDataState = (reduxState: ReduxState) => reduxState.dataState;
export const selectUiState = (reduxState: ReduxState) => reduxState.uiState;

export const selectLocalAll = createSelector(
  selectDataState,
  (dataState) => dataState,
);
export const selectUser = createSelector(
  selectDataState,
  (dataState) => dataState.user,
);

export const selectToken = createSelector(
  selectDataState,
  (dataState) => dataState.token,
);
export const selectVersion = createSelector(
  selectDataState,
  (dataState) => dataState.version,
);
export const selectNativeData = createSelector(
  selectUiState,
  (uiState) => uiState.nativeData,
);

