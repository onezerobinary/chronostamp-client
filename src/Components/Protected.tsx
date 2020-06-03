import React, { useEffect, useState } from 'react';
import Auth0 from '../Auth/Auth';

import { CardElement, ElementsConsumer } from '@stripe/react-stripe-js';

interface IAppProps {
  stripe: any;
  elements: any;
}

const Protected: React.FC<IAppProps> = (props: IAppProps) => {
  // console.log(Auth0.profile);

  let fullName = Auth0.profile.name;
  let nickname = Auth0.profile.nickname;
  let picture = Auth0.profile.picture;
  let sub = Auth0.profile.sub;

  // load the promise
  const handleSubmit = async (element: React.ChangeEvent<HTMLFormElement>) => {
    element.preventDefault();

    // handle payment request to the backend
    const { stripe, elements } = props;
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(result.token);
      // pass the token to your backend API
    }
  };

  return (
    <div>
      <div>
        <p>
          Welcome {fullName} to
          <h2>ChronoStamp Certification Service</h2>
        </p>

        <img src={picture} alt={fullName} width="100" />
      </div>
      <div>
        <form
          onSubmit={(element: React.ChangeEvent<HTMLFormElement>) =>
            handleSubmit(element)
          }
        >
          <input type="text" hidden name="Package1" value="10"></input>
          <CardElement />
          <button>Buy now!</button>
        </form>
      </div>
      <div>
        <button onClick={() => Auth0.signOut()}>Log Out</button>
      </div>
    </div>
  );
};

export default Protected;
