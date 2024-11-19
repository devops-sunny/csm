import type { CloudinarySignature } from '@shared/libs/cloudinary/types';

const BASE_API_ENDPOINT = process.env.NEXT_PUBLIC_BASE_API;
const GET_UPLOAD_SIGNATURE_ENDPOINT = `${BASE_API_ENDPOINT}/api/upload/generate-upload-signature`;

export const getUploadSignature = async (): Promise<CloudinarySignature> => {
  try {
    const response = await fetch(GET_UPLOAD_SIGNATURE_ENDPOINT);

    if (!response.ok) {
      throw new Error('Error uploading file');
    }

    const jsonData = await response.json();

    return jsonData as CloudinarySignature;
  } catch {
    throw new Error('Failed to get upload signature');
  }
};
