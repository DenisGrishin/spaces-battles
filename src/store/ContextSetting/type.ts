export interface SettingState {
  rowsAndColumns: number;
}

export interface Action {
  type: 'resetState';
  setting: {
    rowsAndColumns: number;
  };
}
