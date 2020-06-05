import React, { useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Auth0 from '../Auth/Auth';

import { fetchProfile } from '../API';

import { useAppContext } from './AppContextProvider';
import { ActionType } from '../Actions';
import { Profile } from '../Model';

const Callback: React.FC = (props: any) => {
  // Substribe to todos state and access dispatch function
  const [state, dispatch] = useAppContext();

  useEffect(() => {
    async function auth() {
      await Auth0.handleAthentication();

      //TODO: Check the user
      let id = Auth0.profile.nickname;
      let profile = await fetchProfile(id);
      dispatchProfile(profile);

      props.history.replace('/protected');
    }

    auth();
  }, []);

  function dispatchProfile(profile: Profile): void {
    console.log(`Dispatch Profile: ${profile.chronoStampID}`);

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
