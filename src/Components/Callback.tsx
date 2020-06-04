import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Auth0 from '../Auth/Auth';

const Callback: React.FC = (props: any) => {
  useEffect(() => {
    async function auth() {
      await Auth0.handleAthentication();
      props.history.replace('/protected');
    }

    auth();
  }, []);

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
