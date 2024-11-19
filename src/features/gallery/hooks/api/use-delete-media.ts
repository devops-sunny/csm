import { useAtomValue } from 'jotai';

import { galleryApi } from '@features/gallery/api/gallery-api';
import { selectedDateRangeAtom } from '@features/gallery/states/common';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { useMutation } from '@shared/hooks/api/core/use-mutation';
import { useRevalidate } from '@shared/hooks/api/core/use-revalidate';
import { MediaType } from '@shared/types/api/generated';

export const useDeleteMedia = () => {
  const { revalidateInfinitePage } = useRevalidate();

  const selectedDateRange = useAtomValue(selectedDateRangeAtom);

  return useMutation(API_CACHE_KEY.DELETE_MEDIA, galleryApi.deleteMedia, {
    onSuccess: () => {
      revalidateInfinitePage([
        API_CACHE_KEY.GET_MEDIA_LIST,
        MediaType.General,
        selectedDateRange,
        false,
      ]);
    },
  });
};
