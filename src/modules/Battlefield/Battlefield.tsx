import { useSettingContext } from '@/store/ContextSetting';

import { Board } from './Board';

export const Battlefield = () => {
  const {
    state: { rowsAndColumns, stateBattlefield },
    dispatch,
  } = useSettingContext();

  return (
    <Board
      rowsAndColumns={rowsAndColumns}
      stateBattlefield={stateBattlefield}
      dispatch={dispatch}
    />
  );
};
