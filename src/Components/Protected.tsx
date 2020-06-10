import React, { useEffect, useState } from 'react';
import Auth0 from '../Auth/Auth';
import styled from 'styled-components';

import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLISHABLE_KEY } from '../Auth/config';

import { useAppContext } from './AppContextProvider';
import { ActionType } from '../Actions';
import { AppTabs, TabsType } from './AppTabs';
import { Wallet } from './Wallet';

const Protected: React.FC = () => {
  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

  const [state, dispatch] = useAppContext();

  const [walletMenu, setWalletMenu] = useState(false);
  const [assetsMenu, setAssetsMenu] = useState(false);
  const [searchMenu, setSearchMenu] = useState(false);

  let profile = state.profile;
  let selTab = profile.tab;

  useEffect(() => {
    isAllowed();
  }, [state]);

  function signOut() {
    Auth0.signOut();
    dispatch({
      type: ActionType.signOut,
      payload: false,
    });
  }

  function isAllowed(): void {
    switch (selTab) {
      case TabsType.wallet:
        setWalletMenu(true);
        setAssetsMenu(false);
        setSearchMenu(false);
        break;
      case TabsType.assets:
        setWalletMenu(false);
        setAssetsMenu(true);
        setSearchMenu(false);
        break;
      case TabsType.search:
        setWalletMenu(false);
        setAssetsMenu(false);
        setSearchMenu(true);
        break;
    }
  }

  return (
    <Container>
      <Menu>
        <MenuLeft>
          <AppTitle>ChronoStamp</AppTitle>
        </MenuLeft>
        <MenuRight>
          <Button onClick={() => signOut()}>Log Out</Button>
          <FullName>{profile.fullName}</FullName>
          <Profile src={profile.picture ? profile.picture : ''} />
        </MenuRight>
      </Menu>
      <Title>ChronoStamp Certification Service</Title>
      <AppTabs />
      {walletMenu && (
        <Elements stripe={stripePromise}>
          <ElementsConsumer>
            {({ elements, stripe }) => (
              <Wallet elements={elements} stripe={stripe} />
            )}
          </ElementsConsumer>
        </Elements>
      )}
      {assetsMenu && <div>Asset Menu ...</div>}
      {searchMenu && <div>Search Menu ...</div>}
    </Container>
  );
};

const Container = styled.div({
  background: '#282c34',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  fontSize: '10px',
  color: '#fff',
});

const Menu = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '#232323',
  height: '14vh',
  boxShadow: '0px 1px 6px 1px rgba(0,0,0,1)',
});

const MenuLeft = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
});

const AppTitle = styled.div({
  marginLeft: '8px',
  fontSize: '12px',
  fontFamily: 'Avenir Book',
  transition: 'transform 300ms ease-in-out',
  ':hover': {
    transform: 'translate(5px, 0px) rotate(360deg)',
  },
});

const MenuRight = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
});

const Title = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  color: '#fff',
  fontFamily: 'Avenir Book',
  marginTop: '2vh',
  marginBottom: '1vh',
});

const Profile = styled.img({
  height: '38px',
  width: '38px',
  borderRadius: '38px',
  padding: '1px',
  border: '1px solid #009ee3',
  background: '#282c34',
  marginLeft: '10px',
  marginRight: '6px',
});

const FullName = styled.div({
  fontSize: '8px',
  color: '#fff',
  marginLeft: '10px',
});

const Button = styled.button({
  background: '#009ee3',
  borderRadius: 5,
  border: 'none',
  width: '50px',
  fontSize: '10px',
  ':hover': {
    background: '#1c436a',
    color: '#fff',
  },
});

export default Protected;
