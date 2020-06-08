import React from 'react';
import Auth0 from '../Auth/Auth';
import styled from 'styled-components';

import { Package } from './Package';
import { useAppContext } from './AppContextProvider';
import { ActionType } from '../Actions';
import { AppTabs } from './AppTabs';

interface IAppProps {
  stripe: any;
  elements: any;
}

const Protected: React.FC<IAppProps> = (props: IAppProps) => {
  // console.log(Auth0.profile);

  const [state, dispatch] = useAppContext();

  let profile = state.profile;

  function signOut() {
    Auth0.signOut();
    //TODO: Dispatch logout
    dispatch({
      type: ActionType.signOut,
      payload: false,
    });
  }

  return (
    <Container>
      <Menu>
        <MenuLeft>
          <AppTitle>ChronoStamp</AppTitle>
        </MenuLeft>
        <MenuRight>
          <Button onClick={() => signOut()}>Log Out</Button>
          <FullName>{profile.fullName}</FullName>
          <Profile src={profile.picture ? profile.picture : ''} />
        </MenuRight>
      </Menu>
      <AppTabs />
      <div>
        <p>{profile.account}</p>
        <p>{profile.balance} ChronoStamps</p>
      </div>
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
  fontSize: '10px',
  color: '#fff',
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
  justifyContent: 'space-between',
  background: '#232323',
  height: '14vh',
  boxShadow: '0px 1px 6px 1px rgba(0,0,0,1)',
});

const MenuLeft = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
});

const AppTitle = styled.div({
  marginLeft: '8px',
  fontSize: '12px',
  fontFamily: 'Avenir Book',
  transition: 'transform 300ms ease-in-out',
  ':hover': {
    transform: 'translate(5px, 0px) rotate(360deg)',
  },
});

const MenuRight = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
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
  width: '38px',
  borderRadius: '38px',
  padding: '1px',
  border: '1px solid #009ee3',
  background: '#282c34',
  marginLeft: '10px',
  marginRight: '6px',
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
