import React from 'react';
import { useAppContext } from './AppContextProvider';

export const Wallet: React.FC = () => {
  const [state, dispatch] = useAppContext();

  let profile = state.profile;

  return (
    <div>
      <p>{profile.account}</p>
      <p>{profile.balance} ChronoStamps</p>
    </div>
  );
};
