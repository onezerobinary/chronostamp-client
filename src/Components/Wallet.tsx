import React, { useEffect, useState } from 'react';
import { useAppContext } from './AppContextProvider';
import styled from 'styled-components';
import { Package } from './Package';

import { fetchAccount } from '../API';
import { ActionType } from '../Actions';

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
  }, [state]);

  const [enablePayments, setEnablePayements] = useState(false);

  const checkAccount = () => {
    if (account === '') {
      console.log(`Account must be created`);
      setEnablePayements(false);
    } else {
      setEnablePayements(true);
    }
  };

  async function createAccount() {
    let fetchedProfile = await fetchAccount(profile);

    dispatch({
      type: ActionType.account,
      payload: fetchedProfile,
    });
  }

  return (
    <div>
      {!enablePayments && (
        <NewAccount>
          <Button onClick={() => createAccount()}>Create New Account</Button>
          <p>
            Yuo will receive an email with the recovery words that will allow
            you to generate the private key.
          </p>
        </NewAccount>
      )}
      {enablePayments && (
        <>
          <AccountInfo>
            <AccountInfoLeft>Account: {profile.account}</AccountInfoLeft>
            <AccountInfoRight>
              Balance: {profile.balance} ChronoStamps
            </AccountInfoRight>
          </AccountInfo>

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

const NewAccount = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60vh',
});

const AccountInfo = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: '2vh',
  marginBottom: '4vh',
});

const AccountInfoLeft = styled.div({
  marginLeft: '6px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  fontSize: '8px',
  fontFamily: 'Avenir Book',
});

const AccountInfoRight = styled.div({
  marginRight: '6px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  fontSize: '8px',
  fontFamily: 'Avenir Book',
});

const Button = styled.button({
  background: '#009ee3',
  borderRadius: 5,
  border: 'none',
  width: '120px',
  fontSize: '10px',
  ':hover': {
    background: '#1c436a',
    color: '#fff',
  },
});
