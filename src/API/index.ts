import axios, { AxiosResponse } from 'axios';
import { BACKEND_URL, PROFILE } from '../Auth/config';
import { Profile } from '../Model';

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
