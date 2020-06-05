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

const profile: Profile = {
  chronoStampID: '',
  account: '',
  balance: 0,
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

function loadFromLocalStorage(): InitialStateType {
  let result: InitialStateType = initialState;

  const data = localStorage.getItem('ChronoStampData');
  if (data) {
    return (result = JSON.parse(data));
  }

  return result;
}

function appReducer(state: InitialStateType, action: Action): InitialStateType {
  console.log(`Hi there!`);

  switch (action.type) {
    case ActionType.dispatchProfile:
      console.log(`Reducer called. ${action.payload}`);

      //Update State
      const newState = {
        profile: action.payload,
        authenticated: state.authenticated,
      };
      return newState;

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
