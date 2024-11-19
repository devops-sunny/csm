import { useAtomValue } from 'jotai';

import { galleryApi } from '@features/gallery/api/gallery-api';
import {
  selectedDateRangeAtom,
  selectedFacilityIdsAtom,
} from '@features/gallery/states/common';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { useInfinitePagination } from '@shared/hooks/api/core/use-infinite-pagination';
import { MediaType } from '@shared/types/api/generated';

export const useInfinitePaginationMedia = (mediaType: MediaType) => {
  const selectedFacilityIds = useAtomValue(selectedFacilityIdsAtom);

  const selectedDateRange = useAtomValue(selectedDateRangeAtom);

  const isLogMedia = mediaType === MediaType.Log;

  return useInfinitePagination(
    [
      API_CACHE_KEY.GET_MEDIA_LIST,
      mediaType,
      selectedDateRange,
      isLogMedia && selectedFacilityIds,
    ],
    (page) =>
      galleryApi.getMediaList({
        filter: {
          type: mediaType,
          startDateFilter: selectedDateRange.from,
          endDateFilter: selectedDateRange.to,
          facilityIds: isLogMedia ? selectedFacilityIds : undefined,
        },
        metadata: {
          size: 30,
          page,
        },
      }),
    { skip: !selectedFacilityIds, parallel: true },
  );
};
