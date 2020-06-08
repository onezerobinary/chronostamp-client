import React, { ReactHTMLElement, MouseEvent } from 'react';
import styled from 'styled-components';

export const AppTabs: React.FC = () => {
  function handleTab(param: string) {
    console.log(`what? ${param}`);
  }

  return (
    <Container>
      <Button onClick={() => handleTab('as')}>Assets</Button>
      <Button onClick={() => handleTab('wa')}>Wallet</Button>
      <Button onClick={() => handleTab('se')}>Search</Button>
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
  marginTop: '1vh',
});

const Button = styled.button({
  borderRadius: '5px',
  border: 'none',
  marginLeft: '6px',
});
