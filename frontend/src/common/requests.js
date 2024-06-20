import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const API = `http://127.0.0.1:5000`;
// const API = `https://polytect-48fcb7426534.herokuapp.com`;

export const uploadImage = async ({blob}) => {
  const formData = new FormData();

  formData.append('image', blob);
  const response = await fetch(`${API}/upload`, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json, text/plain, */*",
    }
  });

  if (response.status === 201) {
    const json = await response.json();
    return json
  } else {
    return null;
  }
}

export const getClassification = async ({blob}) => {
    const formData = new FormData();

    formData.append('image', blob);
    
    // Append the image ID as string
    formData.append("image_ids", uuidv4());

    const response = await fetch(`${API}/classify`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json, text/plain, */*",
      }
    });

    if (response.status === 200) {
      const json = await response.json();
      return json
    } else {
      return null;
    }
}