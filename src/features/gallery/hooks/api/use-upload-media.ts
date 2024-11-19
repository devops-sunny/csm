import type { BaseSyntheticEvent } from 'react';
import { useAtomValue } from 'jotai';
import toast from 'react-hot-toast';

import { MEDIA_FILE_SIZE_LIMIT } from '@features/gallery/constants/common';
import { selectedDateRangeAtom } from '@features/gallery/states/common';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { useRevalidate } from '@shared/hooks/api/core/use-revalidate';
import { uploadFile } from '@shared/services/upload-file';
import { MediaType } from '@shared/types/api/generated';
import { UploadFileType } from '@shared/types/common';

export const useUploadMedia = () => {
  const { revalidateInfinitePage } = useRevalidate();

  const selectedDateRange = useAtomValue(selectedDateRangeAtom);

  const handleUpload = async (event: BaseSyntheticEvent) => {
    const { files } = event.target;

    await Promise.all(
      [...files].map(async (file) => {
        const fileSizeInKB = file.size / 1024;

        if (fileSizeInKB > MEDIA_FILE_SIZE_LIMIT) {
          toast.error('File size must be less than 25MB');
        } else {
          await uploadFile(file, UploadFileType.General);
        }
      }),
    );

    revalidateInfinitePage(
      [
        API_CACHE_KEY.GET_MEDIA_LIST,
        MediaType.General,
        selectedDateRange,
        false,
      ],
      {
        hasNewData: true,
      },
    );
  };

  return { upload: handleUpload };
};
