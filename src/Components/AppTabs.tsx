import React from 'react';
import styled from 'styled-components';
import { useAppContext } from './AppContextProvider';
import { ActionType } from '../Actions';

export enum TabsType {
  wallet = 'WALLET',
  assets = 'ASSETS',
  search = 'SEARCH',
}

export const AppTabs: React.FC = () => {
  const [state, dispatch] = useAppContext();

  let disabled = state.profile.balance > 0 ? false : true;

  function handleTab(param: TabsType) {
    let profile = state.profile;
    profile.tab = param;

    dispatch({
      type: ActionType.setTab,
      payload: profile,
    });
  }

  return (
    <Container>
      <Button onClick={() => handleTab(TabsType.wallet)}>Wallet</Button>
      <Button onClick={() => handleTab(TabsType.assets)} disabled={disabled}>
        Assets
      </Button>
      <Button onClick={() => handleTab(TabsType.search)} disabled={disabled}>
        Search
      </Button>
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  fontSize: '14px',
  color: '#fff',
  fontFamily: 'Avenir Book',
  marginTop: '3vh',
});

const Button = styled.button({
  marginLeft: '6px',
  background: '#009ee3',
  borderRadius: 5,
  border: 'none',
  width: '70px',
  fontSize: '10px',
  ':hover': {
    background: '#1c436a',
    color: '#fff',
  },
});
