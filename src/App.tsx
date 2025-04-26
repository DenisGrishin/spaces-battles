import { DndContext } from '@dnd-kit/core';
import { Battlefield } from './modules/Battlefield';
import { BoardShips } from './modules/BoardShips/BoardShips';
import { ProviderSetting } from './store/ContextSetting/';
import Test from './test';

function App() {
  return (
    <ProviderSetting>
      <DndContext>
        <Battlefield />

        <BoardShips />
      </DndContext>
    </ProviderSetting>
  );
}

export default App;
