import React from 'react';
import Auth0 from '../Auth/Auth';

const Public: React.FC = () => {
  return (
    <div>
      <button onClick={() => Auth0.signIn()}> Log In </button>
    </div>
  );
};

export default Public;
