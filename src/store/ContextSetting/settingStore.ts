import { type Action, type SettingState } from './type.ts';

export const stateSetting: SettingState = {
  rowsAndColumns: 10,
  stateBattlefield: [
    ['a-1', 'a-2', 'b-a', '', '', '', '', '', '', ''],
    ['b-a', 'b-a', 'b-a', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', 'b-b', 'b-b', 'b-b', '', '', '', '', '', ''],
    ['', 'b-b', 'b-1', 'b-b', '', '', '', '', '', ''],
    ['', 'b-b', 'b-b', 'b-b', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', '', ''],
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
