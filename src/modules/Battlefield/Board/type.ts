import { Action } from '@dnd-kit/core/dist/store';
import { type Dispatch } from 'react';

export interface ProsBoard {
  rowsAndColumns: number;
  stateBattlefield: string[][];
  dispatch: Dispatch<Action>;
}
