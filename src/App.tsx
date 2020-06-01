import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import auth0Client from '../src/Auth/Auth';
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
    }

    auth();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Route component={Public} path="/" exact />
        <Route component={Callback} path="/callback" />
        <SecuredRoute
          path="/protected"
          component={Protected}
          checkingSession={checkingSession}
        />
      </header>
    </div>
  );
};

export default withRouter(App);
