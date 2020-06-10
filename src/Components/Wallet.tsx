import React, { useEffect, useState } from 'react';
import { useAppContext } from './AppContextProvider';
import styled from 'styled-components';
import { Package } from './Package';

interface IAppProps {
  stripe: any;
  elements: any;
}

export const Wallet: React.FC<IAppProps> = (info: IAppProps) => {
  const [state, dispatch] = useAppContext();

  let profile = state.profile;
  let account = state.profile.account;

  useEffect(() => {
    checkAccount();
  }, []);

  const [enablePayments, setEnablePayements] = useState(false);

  const checkAccount = () => {
    if (account === '') {
      //TODO: create an account
      //TODO: update State an account
      console.log(`Account must be created`);
      setEnablePayements(false);
    } else {
      setEnablePayements(true);
      console.log(`${account}`);
    }
  };

  return (
    <div>
      {!enablePayments && <>Create Account</>}
      {enablePayments && (
        <>
          <p>Account: {profile.account}</p>
          <p>Balance: {profile.balance} ChronoStamps</p>
          <Packages>
            <Package
              title="Package 1"
              amount="5.00 €"
              stripe={info.stripe}
              elements={info.elements}
            />
            <Package
              title="Package 2"
              amount="10.00 €"
              stripe={info.stripe}
              elements={info.elements}
            />
            <Package
              title="Package 3"
              amount="50.00 €"
              stripe={info.stripe}
              elements={info.elements}
            />
          </Packages>
        </>
      )}
    </div>
  );
};

const Packages = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
});
