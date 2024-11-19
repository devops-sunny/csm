import { useAtomValue } from 'jotai';

import { galleryApi } from '@features/gallery/api/gallery-api';
import {
  openChatDrawerAtom,
  openMobileChatDrawerAtom,
} from '@features/gallery/states/modals-drawers';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { useInfinitePagination } from '@shared/hooks/api/core/use-infinite-pagination';
import { useIsMobile } from '@shared/hooks/common/use-is-mobile';

export const useInfinitePaginationMediaComments = () => {
  const isMobile = useIsMobile();

  const chatDrawerData = useAtomValue(openChatDrawerAtom);

  const mobileChatDrawerData = useAtomValue(openMobileChatDrawerAtom);

  const mediaId = (() => {
    if (isMobile) {
      return mobileChatDrawerData?.mediaId;
    }

    return chatDrawerData?.mediaId;
  })();

  return useInfinitePagination(
    [API_CACHE_KEY.GET_MEDIA_COMMENTS, mediaId],
    (page) =>
      galleryApi.getMediaComments({
        filter: { facilityMediaId: mediaId },
        metadata: { size: 10, page },
      }),
    { skip: !mediaId, parallel: true, keepPreviousData: false },
  );
};
