import React from 'react';
import Auth0 from '../Auth/Auth';
import styled from 'styled-components';

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
