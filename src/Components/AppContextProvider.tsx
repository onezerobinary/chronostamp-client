import React, {
  useEffect,
  createContext,
  useReducer,
  Dispatch,
  useContext,
} from 'react';
// utility for localstorage
import { useDebounce } from 'use-debounce';

import { Profile } from '../Model';
import { Action, ActionType } from '../Actions';
import Auth0 from '../Auth/Auth';
import { TabsType } from './AppTabs';

const profile: Profile = {
  chronoStampID: '',
  email: '',
  account: '',
  balance: 0,
  tab: TabsType.wallet,
};

export interface InitialStateType {
  profile: Profile;
  authenticated: boolean;
}

const initialState = {
  profile: profile,
  authenticated: false,
};

type AppCtx = [InitialStateType, Dispatch<Action>];

export const AppContext = createContext<AppCtx>([initialState, () => null]);

export function useAppContext(): AppCtx {
  return useContext(AppContext);
}

// LocalStorage
function saveToLocalStorage(state: InitialStateType) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem('ChronoStampData', serialisedState);
  } catch (e) {
    console.log(`Could not store the state into the localStorage:  ${e}`);
  }
}

export function loadFromLocalStorage(): InitialStateType {
  let result: InitialStateType = initialState;

  const data = localStorage.getItem('ChronoStampData');
  if (data) {
    return (result = JSON.parse(data));
  }

  return result;
}

function appReducer(state: InitialStateType, action: Action): InitialStateType {
  switch (action.type) {
    case ActionType.dispatchProfile:
      //Update State
      const newState = {
        profile: action.payload,
        authenticated: true,
      };
      return newState;

    case ActionType.signOut:
      const signOutState = {
        profile: initialState.profile,
        authenticated: action.payload,
      };
      //call the sigOut from Auth 0
      Auth0.signOut();

      return signOutState;

    case ActionType.setTab:
      const setTabState = {
        profile: action.payload,
        authenticated: true,
      };

      return setTabState;

    case ActionType.account:
      const accountState = {
        profile: action.payload,
        authenticated: true,
      };

      return accountState;

    default:
      return state;
  }
}

export const AppContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, loadFromLocalStorage());
  const [delayedState] = useDebounce(state, 500);

  useEffect(() => {
    saveToLocalStorage(delayedState);
  }, [delayedState]);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};
