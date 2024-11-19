import cookie from 'js-cookie';
import toast from 'react-hot-toast';

import { AUTH_TOKEN } from '@shared/constants/auth';
import type { UploadFileType } from '@shared/types/common';

const BASE_API_ENDPOINT = process.env.NEXT_PUBLIC_BASE_API;

export const uploadFile = async (
  file: File,
  type: UploadFileType,
): Promise<string> => {
  const formData = new FormData();

  formData.append('files', file, file.name);

  const token = cookie.get(AUTH_TOKEN);

  const toastId = toast.loading('Uploading file...');

  try {
    const uploadPromise = fetch(
      `${BASE_API_ENDPOINT}/api/upload?type=${type}`,
      {
        method: 'POST',
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
        body: formData,
      },
    );

    const response = await uploadPromise;

    if (response.ok) {
      toast.success('File uploaded successfully', { id: toastId });
    } else {
      toast.error('Error uploading file', { id: toastId });

      throw new Error('Error uploading file');
    }

    const data = await response.json();

    return data.data.file_url;
  } catch {
    toast.error('Error uploading file', { id: toastId });

    throw new Error('Error uploading file');
  }
};
