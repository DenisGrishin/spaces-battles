import { type Action, type SettingState } from './type.ts';

export const stateSetting: SettingState = {
  rowsAndColumns: 5,
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
    default:
      return state;
  }
};
