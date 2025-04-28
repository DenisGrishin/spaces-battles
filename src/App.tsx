import { Battlefield } from './modules/Battlefield';
import { ProviderSetting } from './store/ContextSetting/';

function App() {
  return (
    <ProviderSetting>
      <Battlefield />
      {/* <Test /> */}
    </ProviderSetting>
  );
}

export default App;
