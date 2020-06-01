import React from 'react';
import Auth0 from '../Auth/Auth';

const Protected: React.FC = () => {
  console.log(Auth0.profile);

  let fullName = Auth0.profile.name;
  let nickname = Auth0.profile.nickname;
  let picture = Auth0.profile.picture;
  let sub = Auth0.profile.sub;

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

      <button onClick={() => Auth0.signOut()}>Log Out</button>
    </div>
  );
};

export default Protected;
