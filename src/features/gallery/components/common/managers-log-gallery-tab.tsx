import { Box, Button, Stack, Typography } from '@mui/material';

import { GalleryItem } from '@features/gallery/components/common/gallery-item';
import { useInfinitePaginationMedia } from '@features/gallery/hooks/api/use-infinite-pagination-media';
import {
  openChatDrawerAtom,
  openMobileChatDrawerAtom,
} from '@features/gallery/states/modals-drawers';
import { EmptyDataRows } from '@shared/components/common/empty-data-rows';
import { LoadMoreInView } from '@shared/components/common/load-more-in-view';
import { LoadingIndicator } from '@shared/components/common/loading-indicator';
import { useIsMobile } from '@shared/hooks/common/use-is-mobile';
import { defaultStore } from '@shared/libs/jotai/default-store';
import {
  closeImageViewModal,
  openImageViewModal,
} from '@shared/services/control-image-view-modal';
import { MediaType } from '@shared/types/api/generated';
import type { ApiType } from '@shared/types/utils/api';

export const ManagersLogGalleryTab = () => {
  const {
    data: mediaData,
    isLoading: getMediaLoading,
    isFetchingMore,
    loadMore,
  } = useInfinitePaginationMedia(MediaType.Log);

  const isMobile = useIsMobile();

  const handleItemClick = (
    media: ApiType['FacilityMediaResponse'],
    index: number,
  ) => {
    const { fullName } = media;

    openImageViewModal({
      mediaList: allMedias,
      initialSlideIdx: index,
      FooterComponent: (viewingMedia) => (
        <Stack
          direction="row"
          justifyContent="space-between"
        >
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 400 }}
            >
              Uploaded by
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 500 }}
            >
              {fullName}
            </Typography>
          </Box>
          <Button
            sx={{ px: 4 }}
            onClick={() => {
              closeImageViewModal();

              const { id: viewingMediaId, mediaName: viewingMediaName } =
                viewingMedia;

              if (isMobile) {
                defaultStore.set(openMobileChatDrawerAtom, {
                  mediaId: viewingMediaId,
                  mediaName: viewingMediaName,
                });
              } else {
                defaultStore.set(openChatDrawerAtom, {
                  mediaId: viewingMediaId,
                  mediaName: viewingMediaName,
                });
              }
            }}
          >
            Comment
          </Button>
        </Stack>
      ),
    });
  };

  const allMedias = mediaData?.flatMap((i) => i.data.nodes) ?? [];

  const isEmpty = mediaData?.[0].data.nodes.length === 0;

  const hasMore = (() => {
    const totalNodes =
      mediaData?.reduce((acc, curr) => acc + curr.data.nodes.length, 0) ?? 0;

    return totalNodes < (mediaData?.[0].data.metadata.totalDocs ?? 0);
  })();

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: 2.5,
          py: 2,
          px: 3,
        }}
      >
        {!mediaData && getMediaLoading && <LoadingIndicator />}
        {!getMediaLoading && isEmpty && <EmptyDataRows />}
        {allMedias.map((media, index) => (
          <GalleryItem
            key={media.id}
            media={media}
            onClick={() => handleItemClick(media, index)}
          />
        ))}
      </Box>
      <LoadMoreInView
        hasMore={hasMore}
        onNext={loadMore}
        loading={isFetchingMore}
      />
    </>
  );
};
