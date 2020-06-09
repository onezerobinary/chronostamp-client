import React, { useState } from 'react';
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

  const [tab, setTab] = useState(state.profile.tab);

  function handleTab(param: TabsType) {
    let profile = state.profile;
    profile.tab = param;

    setTab(param);

    dispatch({
      type: ActionType.setTab,
      payload: profile,
    });
  }

  return (
    <Container>
      <Button
        style={
          tab === TabsType.wallet
            ? { background: '#1c436a', color: '#fff' }
            : { background: '#009ee3' }
        }
        onClick={() => handleTab(TabsType.wallet)}
      >
        Wallet
      </Button>
      <Button
        style={
          tab === TabsType.assets
            ? { background: '#1c436a', color: '#fff' }
            : { background: '#009ee3' }
        }
        onClick={() => handleTab(TabsType.assets)}
        disabled={disabled}
      >
        Assets
      </Button>
      <Button
        style={
          tab === TabsType.search
            ? { background: '#1c436a', color: '#fff' }
            : { background: '#009ee3' }
        }
        onClick={() => handleTab(TabsType.search)}
        disabled={disabled}
      >
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
  border: 'none',
  borderRadius: 5,
  width: '70px',
  fontSize: '10px',
  ':hover': {
    background: '#1c436a',
    color: '#fff',
  },
  ':disabled': {
    background: '#009ee3',
    color: 'gray',
  },
});
