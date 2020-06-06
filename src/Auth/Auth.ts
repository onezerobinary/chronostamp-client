import auth0 from 'auth0-js';
import { ChronoStampAuthConfig, HOME } from './config';

export type AuthConfig = {
  domain: string;
  clientID: string;
  redirectUri: string;
  responseType: string;
  scope: string;
};

class Auth {
  idToken: string = '';
  profile: any;
  expiresAt: number = 0;

  auth0 = new auth0.WebAuth(ChronoStampAuthConfig);

  isAuthenticated(): boolean {
    console.log(`I'm called! > ${this.expiresAt}`);

    // const isValid = new Date().getTime() < this.expiresAt;
    const isValid = new Date().getTime() < new Date().getTime() + 1000;

    console.log(`${isValid}`);

    return isValid;
  }

  signIn() {
    this.auth0.authorize();
  }

  async handleAthentication(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.auth0.parseHash((err, authResult) => {
          if (err) {
            return reject(err);
          }

          if (!authResult || !authResult.idToken) {
            return reject(err);
          }

          this.setSession(authResult);
          resolve();
        });
      } catch (error) {
        reject(`It was not possible to handle Athentication. ${error}`);
      }
    });
  }

  setSession(authResult: auth0.Auth0DecodedHash): void {
    if (authResult.idToken && authResult.idTokenPayload) {
      this.idToken = authResult.idToken;
      this.profile = authResult.idTokenPayload;
      // set the time that the id token will expire at
      this.expiresAt = authResult.idTokenPayload.exp * 1000;
    }
  }

  signOut() {
    this.auth0.logout({
      returnTo: HOME,
      clientID: ChronoStampAuthConfig.clientID,
    });
  }

  async silentAuth(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.auth0.checkSession({}, (err, authResult) => {
          if (err) {
            return reject(err);
          }

          this.setSession(authResult);
          resolve();
        });
      } catch (err) {
        reject(`It was not possible to silentAuth. ${err}`);
      }
    });
  }
}

const Auth0 = new Auth();

export default Auth0;
