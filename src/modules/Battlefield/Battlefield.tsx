import { Board } from '@/components/Board';

import { useSettingContext } from '@/store/ContextSetting';
import { Droppable } from '../Droppable';

export const Battlefield = () => {
  const {
    state: { rowsAndColumns, stateBattlefield },
  } = useSettingContext();

  return (
    <Droppable>
      <Board
        rowsAndColumns={rowsAndColumns}
        stateBattlefield={stateBattlefield}
      />
    </Droppable>
  );
};
