import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import styled from 'styled-components';
import { STRIPE_PUBLISHABLE_KEY } from '../Auth/config';
import Auth0 from '../Auth/Auth';

import { useAppContext } from './AppContextProvider';

function SecuredRoute(props: any) {
  const { component: Component, path } = props;

  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

  const [state, dispatch] = useAppContext();

  return (
    <Route
      path={path}
      render={() => {
        if (!state.authenticated) {
          return (
            <Content>
              <Button onClick={() => Auth0.signIn()}>... SignIn Again</Button>
            </Content>
          );
        }
        if (!Auth0.isAuthenticated(state.authenticated)) {
          Auth0.signIn();
          return <div></div>;
        }
        return (
          <Elements stripe={stripePromise}>
            <ElementsConsumer>
              {({ elements, stripe }) => (
                <Component elements={elements} stripe={stripe} />
              )}
            </ElementsConsumer>
          </Elements>
        );
      }}
    />
  );
}

const Content = styled.div({
  background: '#282c34',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const Button = styled.button({
  background: '#009ee3',
  borderRadius: 5,
  border: 'none',
  width: '100px',
  fontSize: '10px',
  ':hover': {
    background: '#1c436a',
    color: '#fff',
  },
});

export default withRouter(SecuredRoute);
