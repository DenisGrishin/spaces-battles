import { Board } from '@/components/Board';

import { useSettingContext } from '@/store/ContextSetting';
import { useEffect } from 'react';

export const Battlefield = () => {
  const {
    state: { rowsAndColumns },
  } = useSettingContext();

  return (
    <div>
      <Board rowsAndColumns={rowsAndColumns} />
    </div>
  );
};
