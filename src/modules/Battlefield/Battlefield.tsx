import { useSettingContext } from '@/store/ContextSetting';

import { Board } from './Board';

export const Battlefield = () => {
  const {
    state: { rowsAndColumns, stateBattlefield },
  } = useSettingContext();

  return (
    <Board
      rowsAndColumns={rowsAndColumns}
      stateBattlefield={stateBattlefield}
    />
  );
};
