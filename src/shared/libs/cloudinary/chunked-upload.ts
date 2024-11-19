import toast from 'react-hot-toast';
import { v4 as generateId } from 'uuid';

import { getUploadSignature } from '@shared/libs/cloudinary/get-upload-signature';
import type { CloudinaryUploadedResponse } from '@shared/libs/cloudinary/types';
import { uploadAssetsToCloudinary } from '@shared/services/upload-assets-to-cloud';

const CHUNK_SIZE_IN_MB = 5;
const CHUNK_SIZE_IN_BYTES = CHUNK_SIZE_IN_MB * 1024 * 1024;

type ChunkedUploadInput = {
  file: File;
  onSuccess?: (response: CloudinaryUploadedResponse) => void;
  onError?: () => void;
};

export const chunkedUpload = async ({
  file,
  onSuccess,
  onError,
}: ChunkedUploadInput) => {
  const signature = await getUploadSignature();

  const totalChunks = Math.ceil(file.size / CHUNK_SIZE_IN_BYTES);

  const uniqueUploadId = generateId();

  let chunkCount = 0;

  const uploadChunk = async (startByte: number, endByte: number) => {
    const formData = new FormData();

    formData.append('file', file.slice(startByte, endByte));
    formData.append('timestamp', signature.timestamp.toString());
    formData.append('api_key', signature.api_key);
    formData.append('signature', signature.signature);
    formData.append('cloud_name', signature.cloud_name);
    formData.append('upload_preset', signature.upload_preset);

    const endByteSliced = endByte - 1;

    const contentRange = `bytes ${startByte}-${endByteSliced}/${file.size}`;

    try {
      const response = await uploadAssetsToCloudinary({
        cloudName: signature.cloud_name,
        body: formData,
        headers: {
          'X-Unique-Upload-Id': uniqueUploadId,
          'Content-Range': contentRange,
        },
      });

      chunkCount += 1;

      if (chunkCount < totalChunks) {
        const nextStartByte = chunkCount * CHUNK_SIZE_IN_BYTES;

        const nextEndByte = Math.min(
          nextStartByte + CHUNK_SIZE_IN_BYTES,
          file.size,
        );

        await uploadChunk(nextStartByte, nextEndByte);
      } else {
        const responseData: CloudinaryUploadedResponse = await response.json();

        onSuccess?.(responseData);
      }
    } catch {
      toast.error('Failed to upload file');

      onError?.();
    }
  };

  uploadChunk(0, Math.min(CHUNK_SIZE_IN_BYTES, file.size));
};
