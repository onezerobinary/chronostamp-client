import React from 'react';
import Auth0 from '../Auth/Auth';

const Protected: React.FC = () => {
  return (
    <div>
      <p>Hi there!</p>
      <button onClick={() => Auth0.signOut()}>Log Out</button>
    </div>
  );
};

export default Protected;
