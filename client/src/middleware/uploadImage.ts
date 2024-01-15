import { userRequest } from '../middleware/requestMethods';

const UPLOAD_URL = "https://api.cloudinary.com/v1_1"
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const uploadImage = async ( file: File, accessToken: string) => {
    try {
    const signResponse = await userRequest(accessToken).get('/upload-image/sign');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('timestamp', signResponse.data.timestamp);
    formData.append('signature', signResponse.data.signature);
    formData.append('api_key', signResponse.data.api_key);
    formData.append('folder', 'Farm');

    const uploadResponse = await fetch(`${UPLOAD_URL}/${CLOUD_NAME}/upload`, {
      method: 'POST',
      body: formData
    });

    const data = await uploadResponse.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
  }

}

export default uploadImage;