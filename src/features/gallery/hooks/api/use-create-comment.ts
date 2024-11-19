import { useAtomValue } from 'jotai';

import { galleryApi } from '@features/gallery/api/gallery-api';
import {
  selectedDateRangeAtom,
  selectedFacilityIdsAtom,
} from '@features/gallery/states/common';
import {
  openChatDrawerAtom,
  openMobileChatDrawerAtom,
} from '@features/gallery/states/modals-drawers';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { useMutation } from '@shared/hooks/api/core/use-mutation';
import { useRevalidate } from '@shared/hooks/api/core/use-revalidate';
import { useIsMobile } from '@shared/hooks/common/use-is-mobile';
import { MediaType } from '@shared/types/api/generated';

export const useCreateComment = () => {
  const isMobile = useIsMobile();

  const chatDrawerData = useAtomValue(openChatDrawerAtom);

  const mobileChatDrawerData = useAtomValue(openMobileChatDrawerAtom);

  const selectedFacilityIds = useAtomValue(selectedFacilityIdsAtom);

  const selectedDateRange = useAtomValue(selectedDateRangeAtom);

  const mediaId = (() => {
    if (isMobile) {
      return mobileChatDrawerData?.mediaId;
    }

    return chatDrawerData?.mediaId;
  })();

  const { revalidateInfinitePage } = useRevalidate();

  return useMutation(
    API_CACHE_KEY.CREATE_MEDIA_COMMENT,
    galleryApi.createMediaComment,
    {
      onSuccess: () => {
        revalidateInfinitePage([API_CACHE_KEY.GET_MEDIA_COMMENTS, mediaId]);

        revalidateInfinitePage([
          API_CACHE_KEY.GET_MEDIA_LIST,
          MediaType.Log,
          selectedDateRange,
          selectedFacilityIds,
        ]);

        revalidateInfinitePage([
          API_CACHE_KEY.GET_MEDIA_LIST,
          MediaType.General,
          selectedDateRange,
          false,
        ]);
      },
    },
  );
};
