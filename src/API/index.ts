import axios from 'axios';
import { BACKEND_URL, PROFILE, API } from '../Auth/config';
import { Profile } from '../Model';

export type Payment = {
  token: string;
  amount: string;
  chronoStampID: string;
};

const axiosConfig = {
  mode: 'no-cors',
  crossorigin: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  },
};

export async function fetchProfile(id: string): Promise<Profile> {
  return new Promise(async (resolve, reject) => {
    try {
      const URL = `${BACKEND_URL}${PROFILE}`;

      const data = JSON.stringify({
        chronoStampID: id,
      });

      let result = await axios.post(URL, data, axiosConfig);
      let profile: Profile = result.data;

      resolve(profile);
    } catch (err) {
      reject(`It was not possible to get the Profile. ${err}`);
    }
  });
}

export async function doPayment(payment: Payment): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    try {
      const URL = `${BACKEND_URL}${API}`;

      const data = JSON.stringify(payment);

      let response = await axios.post(URL, data, axiosConfig);

      console.log(response);

      // Check the result of the payment
      if (response.data !== 'Charged') {
        reject(`It was not possible to perform the payment`);
      }

      resolve(true);
    } catch (err) {
      reject(`It was not possible to perform the payment. ${err}`);
    }
  });
}
