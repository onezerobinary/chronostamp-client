import React from 'react';
import Auth0 from '../Auth/Auth';
import { CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import styled from 'styled-components';

import { BACKEND_URL, API } from '../Auth/config';
import { Package } from './Package';

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

  console.log(sub);

  // load the promise
  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.target);
    const pack = data.get('Pack1');

    console.log(pack);

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

      const data = JSON.stringify({
        token: result.token,
        amount: pack,
        chronoStampID: nickname,
      });

      const URL = `${BACKEND_URL}${API}`;

      let axiosConfig = {
        mode: 'no-cors',
        crossorigin: true,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'Access-Control-Allow-Origin': '*',
        },
      };

      let response = await axios.post(URL, data, axiosConfig);

      console.log(response);
    }

    // redirect, clear inputs, thank alert ...
  };

  return (
    <Container>
      <Menu>
        <Button onClick={() => Auth0.signOut()}>Log Out</Button>
        <FullName>{fullName}</FullName>
        <Profile src={picture} alt={fullName} />
      </Menu>
      <Title>ChronoStamp Certification Service</Title>
      <Packages>
        <Package
          title="Package 1"
          amount="5.00 €"
          stripe={props.stripe}
          elements={props.elements}
        />
        <Package
          title="Package 2"
          amount="10.00 €"
          stripe={props.stripe}
          elements={props.elements}
        />
        <Package
          title="Package 3"
          amount="50.00 €"
          stripe={props.stripe}
          elements={props.elements}
        />
      </Packages>
    </Container>
  );
};

const Container = styled.div({
  background: '#282c34',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
});

const Packages = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
});

const Menu = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginTop: '10px',
  marginRight: '10px',
});

const Title = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  color: '#fff',
  fontFamily: 'Avenir Book',
  marginTop: '15px',
  marginBottom: '45px',
});

const Profile = styled.img({
  height: '38px',
  borderRadius: '38px',
  padding: '1px',
  border: '1px solid #009ee3',
  background: '#282c34',
  marginLeft: '10px',
});

const FullName = styled.div({
  fontSize: '8px',
  color: '#fff',
  marginLeft: '10px',
});

const Button = styled.button({
  background: '#009ee3',
  borderRadius: 5,
  border: 'none',
  width: '50px',
  fontSize: '10px',
  ':hover': {
    background: '#1c436a',
    color: '#fff',
  },
});

export default Protected;
