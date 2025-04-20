import { Battlefield } from './modules/Battlefield';
import { ProviderSetting } from './store/ContextSetting/';

function App() {
  return (
    <ProviderSetting>
      <Battlefield />
    </ProviderSetting>
  );
}

export default App;
