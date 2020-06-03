import React, { useEffect, useState } from 'react';
import Auth0 from '../Auth/Auth';

import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLISHABLE_KEY } from '../Auth/config';
import { Elements, CardElement } from '@stripe/react-stripe-js';

const Protected: React.FC = () => {
  console.log(Auth0.profile);

  const [stripeP, setStripeP] = useState({}) || null;

  let fullName = Auth0.profile.name;
  let nickname = Auth0.profile.nickname;
  let picture = Auth0.profile.picture;
  let sub = Auth0.profile.sub;

  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

  // load the promise
  useEffect(() => {
    async function stripe() {
      let stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);
      if (stripe !== null) {
        setStripeP(stripe);

        console.log(stripeP);
      }
    }
    stripe();
  }, []);

  return (
    <div>
      <p>
        Welcome {fullName} to
        <h2>ChronoStamp Certification Service</h2>
      </p>

      <img
        src={picture}
        alt={fullName}
        width="100"
        className="shadow rounded mb-2"
      />

      <Elements stripe={stripePromise}>
        <CardElement />
      </Elements>

      <button onClick={() => Auth0.signOut()}>Log Out</button>
    </div>
  );
};

export default Protected;
