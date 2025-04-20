import { Board } from '@/components/Board';

import { useSettingContext } from '@/store/ContextSetting';

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
