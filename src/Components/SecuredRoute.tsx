import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Auth0 from '../Auth/Auth';

import { Elements, ElementsConsumer } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLISHABLE_KEY } from '../Auth/config';

function SecuredRoute(props: any) {
  const { component: Component, path, checkingSession } = props;

  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

  return (
    <Route
      path={path}
      render={() => {
        if (checkingSession) {
          return <button onClick={() => Auth0.signIn()}>Log In Again</button>;
        }
        if (!Auth0.isAuthenticated()) {
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

export default withRouter(SecuredRoute);
