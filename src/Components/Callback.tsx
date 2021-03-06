import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Auth0 from '../Auth/Auth';

import { fetchProfile } from '../API';

import { useAppContext } from './AppContextProvider';
import { ActionType } from '../Actions';
import { Profile } from '../Model';

const Callback: React.FC = (props: any) => {
  const [state, dispatch] = useAppContext();

  useEffect(() => {
    async function auth() {
      await Auth0.handleAthentication();

      //TODO: Check the user
      let tmpProfile: Profile = {
        chronoStampID: Auth0.profile.nickname,
        account: '',
        balance: 0,
        fullName: Auth0.profile.name || '',
        sub: Auth0.profile.sub,
        picture: Auth0.profile.picture || '',
      };

      let profile = await fetchProfile(tmpProfile);
      dispatchProfile(profile);

      props.history.replace('/protected');
    }

    auth();
  }, []);

  function dispatchProfile(profile: Profile): void {
    dispatch({
      type: ActionType.dispatchProfile,
      payload: profile,
    });
  }

  return (
    <Content>
      <Loading>Loading profile ...</Loading>
    </Content>
  );
};

// Styles
const Content = styled.div({
  background: '#282c34',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const Loading = styled.div({
  color: '#009ee3',
});

export default withRouter(Callback);
