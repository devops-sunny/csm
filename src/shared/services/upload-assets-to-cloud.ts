type UploadAssetsToCloudinaryInput = {
  body: FormData;
  cloudName: string;
  headers?: HeadersInit;
};

export const uploadAssetsToCloudinary = async ({
  body,
  headers,
  cloudName,
}: UploadAssetsToCloudinaryInput) => {
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    {
      method: 'POST',
      body,
      headers,
    },
  );

  if (!response.ok) {
    throw new Error('Error uploading file');
  }

  return response;
};
