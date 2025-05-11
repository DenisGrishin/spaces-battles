import { Action } from '@/store/ContextSetting/type';
import { type Dispatch } from 'react';

export interface ProsBoard {
  rowsAndColumns: number;
  stateBattlefield: string[][];
  dispatch: Dispatch<Action>;
}
