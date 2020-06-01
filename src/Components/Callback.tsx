import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import Auth0 from '../Auth/Auth';

const Callback: React.FC = (props: any) => {
  useEffect(() => {
    async function auth() {
      await Auth0.handleAthentication();
      //TODO: update props
      console.log(props);
      props.history.replace('/protected');
    }

    auth();
  }, []);

  return <p>Loading profile ...</p>;
};

export default withRouter(Callback);
