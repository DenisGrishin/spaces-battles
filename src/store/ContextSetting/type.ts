export interface SettingState {
  rowsAndColumns: number;
  stateBattlefield: string[][];
}

export type Action =
  | {
      type: 'resetState';
    }
  | {
      type: 'createStateBattlefield';
      value: number;
    }
  | {
      type: 'updateStateBattlefield';
      newStateBattlefield: string[][];
    };
