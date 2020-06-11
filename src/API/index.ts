import axios from 'axios';
import {
  BACKEND_URL,
  PROFILE,
  API,
  UPDATE,
  CHRONOSTAMP_VALUE,
  ACCOUNT,
  API_ASSET,
} from '../Auth/config';
import { Profile } from '../Model';

export type Payment = {
  token: string;
  amount: string;
  profile: Profile;
};

function Eur2ChronoStamp(amount: string): number {
  return parseInt(amount) / CHRONOSTAMP_VALUE;
}

const axiosConfig = {
  mode: 'no-cors',
  crossorigin: true,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  },
};

const axiosAssetConfig = {
  mode: 'no-cors',
  crossorigin: true,
  headers: {
    // 'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
  },
};

export async function sendAsset(formData: FormData): Promise<Profile> {
  return new Promise(async (resolve, reject) => {
    try {
      const URL = `${BACKEND_URL}${API_ASSET}`;

      console.log(`Data ${formData}`);

      console.log(formData);

      let result = await axios.post(URL, formData, axiosAssetConfig);
      let profile: Profile = result.data;

      resolve(profile);
    } catch (err) {
      reject(`It was not possible to get the Profile. ${err}`);
    }
  });
}

export async function fetchAccount(tmpProfile: Profile): Promise<Profile> {
  return new Promise(async (resolve, reject) => {
    try {
      const URL = `${BACKEND_URL}${ACCOUNT}`;

      const data = JSON.stringify(tmpProfile);

      let result = await axios.post(URL, data, axiosConfig);
      let profile: Profile = result.data;

      resolve(profile);
    } catch (err) {
      reject(`It was not possible to get the Profile. ${err}`);
    }
  });
}

export async function fetchProfile(tmpProfile: Profile): Promise<Profile> {
  return new Promise(async (resolve, reject) => {
    try {
      const URL = `${BACKEND_URL}${PROFILE}`;

      const data = JSON.stringify(tmpProfile);

      let result = await axios.post(URL, data, axiosConfig);
      let profile: Profile = result.data;

      resolve(profile);
    } catch (err) {
      reject(`It was not possible to get the Profile. ${err}`);
    }
  });
}

export async function updateProfile(profile: Profile): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    try {
      const URL = `${BACKEND_URL}${UPDATE}`;

      const data = JSON.stringify(profile);

      let isUpdated = await axios.post(URL, data, axiosConfig);

      resolve(isUpdated.data);
    } catch (err) {
      reject(`It was not possible to update the Profile. ${err}`);
    }
  });
}

export async function doPayment(payment: Payment): Promise<Profile> {
  return new Promise(async (resolve, reject) => {
    try {
      const URL = `${BACKEND_URL}${API}`;

      const data = JSON.stringify(payment);

      let response = await axios.post(URL, data, axiosConfig);

      // Check the result of the payment
      if (response.data !== 'Charged') {
        reject(`It was not possible to perform the payment`);
      }

      // Update info
      let profile = await fetchProfile(payment.profile);

      let newBalance = profile.balance + Eur2ChronoStamp(payment.amount);
      profile.balance = newBalance;

      let isUpdated = await updateProfile(profile);

      if (isUpdated) {
        resolve(profile);
      }

      reject(`It was not possible to update the payment to the account.`);
    } catch (err) {
      reject(`It was not possible to perform the payment. ${err}`);
    }
  });
}
