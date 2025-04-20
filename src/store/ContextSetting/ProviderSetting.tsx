import React, {
  ReactNode,
  useReducer,
  createContext,
  type Dispatch,
  useContext,
} from 'react';
import { reducerSetting, stateSetting } from './settingStore';
import { Action, SettingState } from './type';

interface PropsContext {
  state: SettingState;
  dispatch: Dispatch<Action>;
}

const ContextSetting = createContext<PropsContext>({
  state: stateSetting,
  dispatch: () => undefined,
});

export const ProviderSetting = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducerSetting, stateSetting);

  return (
    <ContextSetting.Provider value={{ state, dispatch }}>
      {children}{' '}
    </ContextSetting.Provider>
  );
};
export const useSettingContext = () => useContext(ContextSetting);
