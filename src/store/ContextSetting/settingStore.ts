import { type Action, type SettingState } from './type.ts';

export const stateSetting: SettingState = {
  rowsAndColumns: 5,
  stateBattlefield: [
    ['a1', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', 'b1'],
  ],
};

export const reducerSetting = (
  state: SettingState,
  action: Action
): SettingState => {
  switch (action.type) {
    case 'resetState': {
      return {
        ...state,
      };
    }
    case 'createStateBattlefield': {
      return {
        ...state,
        rowsAndColumns: action.value,
        stateBattlefield: [
          /* eslint-disable @typescript-eslint/no-unused-vars */
          ...Array.from({ length: action.value }).map((_row) => {
            return [...Array.from({ length: action.value }).map((_cell) => '')];
          }),
        ],
      };
    }
    case 'updateStateBattlefield': {
      return {
        ...state,
        stateBattlefield: action.newStateBattlefield,
      };
    }
    default:
      return state;
  }
};
