import { Box, Button, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';

import { GalleryItem } from '@features/gallery/components/common/gallery-item';
import {
  FOOTER_ACTIONS_HEIGHT,
  MOBILE_TABS_HEIGHT,
  TABS_HEIGHT,
} from '@features/gallery/constants/layout';
import { useInfinitePaginationMedia } from '@features/gallery/hooks/api/use-infinite-pagination-media';
import {
  editModeActiveAtom,
  selectedMediaIdsAtom,
} from '@features/gallery/states/common';
import {
  openChatDrawerAtom,
  openMobileChatDrawerAtom,
} from '@features/gallery/states/modals-drawers';
import { EmptyDataRows } from '@shared/components/common/empty-data-rows';
import { LoadMoreInView } from '@shared/components/common/load-more-in-view';
import { LoadingIndicator } from '@shared/components/common/loading-indicator';
import {
  APP_HEADER_HEIGHT,
  APP_MOBILE_HEADER_HEIGHT,
} from '@shared/constants/layout';
import { useIsMobile } from '@shared/hooks/common/use-is-mobile';
import { defaultStore } from '@shared/libs/jotai/default-store';
import {
  closeImageViewModal,
  openImageViewModal,
} from '@shared/services/control-image-view-modal';
import { MediaType } from '@shared/types/api/generated';
import type { ApiType } from '@shared/types/utils/api';
import { computeMaxViewportHeight } from '@shared/utils/compute-max-viewport-height';

export const OtherPicturesTab = () => {
  const theme = useTheme();

  const editModeActive = useAtomValue(editModeActiveAtom);

  const selectedMediaIds = useAtomValue(selectedMediaIdsAtom);

  const {
    data: mediaData,
    isLoading: getMediaLoading,
    isFetchingMore,
    loadMore,
  } = useInfinitePaginationMedia(MediaType.General);

  const isMobile = useIsMobile();

  const handleItemClick = (
    media: ApiType['FacilityMediaResponse'],
    index: number,
  ) => {
    if (editModeActive) {
      defaultStore.set(selectedMediaIdsAtom, (prev) => {
        const isSelected = prev.includes(Number(media.id));

        if (isSelected) {
          return prev.filter((id) => id !== media.id);
        }

        return [...prev, media.id];
      });
    } else {
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
                {media.fullName}
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
    }
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
          maxHeight: computeMaxViewportHeight([
            APP_HEADER_HEIGHT,
            TABS_HEIGHT,
            editModeActive ? FOOTER_ACTIONS_HEIGHT : 0,
          ]),
          boxSizing: 'border-box',
          overflowY: 'auto',
          overflowX: 'hidden',
          [theme.breakpoints.down('md')]: {
            maxHeight: computeMaxViewportHeight([
              APP_MOBILE_HEADER_HEIGHT,
              MOBILE_TABS_HEIGHT,
              editModeActive ? FOOTER_ACTIONS_HEIGHT : 0,
            ]),
          },
        }}
      >
        {!mediaData && getMediaLoading && <LoadingIndicator />}
        {!getMediaLoading && isEmpty && <EmptyDataRows />}
        {allMedias.map((media, index) => {
          if (!media.id) return null;

          return (
            <GalleryItem
              key={media.id}
              media={media}
              canBeDeleted
              selected={selectedMediaIds.includes(media.id)}
              onClick={() => {
                handleItemClick(media, index);
              }}
            />
          );
        })}
      </Box>
      <LoadMoreInView
        hasMore={hasMore}
        onNext={loadMore}
        loading={isFetchingMore}
      />
    </>
  );
};
