import React, { useState, useRef } from 'react';
import styled from 'styled-components';

import { sendAsset } from '../API';

export type Asset = {
  file: File;
  title: string;
};

const initialAssetState: Asset = {
  file: new File([], ''),
  title: '',
};

export const Assets: React.FC = () => {
  const [asset, setAsset] = useState<Asset>(initialAssetState);

  async function uploadWithFormData(): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const formData = new FormData();
        formData.append('title', asset.title);
        formData.append('asset', asset.file);

        //TODO: send the data
        let foo = await sendAsset(formData);

        console.log(foo.email);

        resolve(true);
      } catch (err) {
        reject(`It was not possible to upload the asset. ${err}`);
      }
    });
  }

  function upFile(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files) {
      let uploadedAsset = e.target.files[0];
      setAsset({ file: uploadedAsset, title: uploadedAsset.name });
    }
  }

  return (
    <div>
      <p> Chronostamp an Asset </p>
      <form>
        <label>Upload the Asset that you want to Chronostamp:</label>
        <input type="file" name="file" onChange={(e) => upFile(e)} />
        <Button onClick={uploadWithFormData}>Chronostamp</Button>
      </form>
    </div>
  );
};

const Button = styled.button({
  background: '#c6c36f',
  borderRadius: 5,
  border: 'none',
  width: '80px',
  fontSize: '10px',
  ':hover': {
    background: '#1c436a',
    color: '#fff',
  },
});
