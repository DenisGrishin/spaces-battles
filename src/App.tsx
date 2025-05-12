import { Battlefield } from './modules/Battlefield';
import { ProviderSetting } from './store/ContextSetting/';
import { Test } from './test';

function App() {
  return (
    <ProviderSetting>
      <Battlefield />
      <Test />
    </ProviderSetting>
  );
}

export default App;
