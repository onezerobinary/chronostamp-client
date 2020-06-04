import React from 'react';
import styled, { keyframes } from 'styled-components';
import Auth0 from '../Auth/Auth';

import logo from '../logo.svg';

const Public: React.FC = () => {
  return (
    <Content>
      <Rotate>
        <MyLogo src={logo} />
      </Rotate>

      <Title>ChronoStamp Service</Title>

      <SubTitle>Declare the Truth of Something</SubTitle>
      <Button onClick={() => Auth0.signIn()}>Log In</Button>
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

const rotate = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },

  to: {
    transform: 'rotate(360deg)',
  },
});

const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate} 12s linear infinite;
`;

const MyLogo = styled.img({
  alt: 'ChronoStamp',
  height: '10vmin',
  marginTop: '2%',
  marginBottom: '2%',
});

const Button = styled.button({
  background: '#009ee3',
  borderRadius: 5,
  ':hover': {
    borderRadius: 0,
    background: '#00feef',
  },
});

const Title = styled.h3({
  color: '#ffffff',
  fontFamily: 'Avenir Book',
});

const SubTitle = styled(Title)({
  fontSize: '14px',
});

export default Public;
