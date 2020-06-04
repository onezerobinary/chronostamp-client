import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import auth0Client from './Auth/Auth';
import { Route } from 'react-router-dom';

import Public from '../src/Components/Public';
import Callback from '../src/Components/Callback';
import SecuredRoute from '../src/Components/SecuredRoute';
import Protected from '../src/Components/Protected';

const App: React.FC<any> = (initialProps: any) => {
  const [checkingSession, setCheckingSession] = useState(
    initialProps.checkingSession
  );

  useEffect(() => {
    async function auth() {
      if (initialProps.path === '/callback') {
        setCheckingSession(false);
        return;
      }

      try {
        await auth0Client.silentAuth();
      } catch (err) {
        if (err.error !== 'login_required') {
          console.log(err.error);
        }
      }
      setCheckingSession(false);
    }

    auth();
  }, []);

  return (
    <div className="App">
      <Route component={Public} path="/" exact />
      <Route component={Callback} path="/callback" />
      <SecuredRoute
        path="/protected"
        component={Protected}
        checkingSession={checkingSession}
      />
    </div>
  );
};

export default withRouter(App);
