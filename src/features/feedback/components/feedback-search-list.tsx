import { FormControl, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useAtomValue } from 'jotai';

import PlusIcon from '@assets/icons/common/plus.svg';
import { feedbackApi } from '@features/feedback/api/feedback-api';
import { FeedbackRow } from '@features/feedback/components/feedback-row';
import {
  MOBILE_SEARCH_INPUT_HEIGHT,
  SEARCH_INPUT_HEIGHT,
} from '@features/feedback/constants/layout';
import { feedbackSearchTextAtom } from '@features/feedback/states/common';
import { EmptyDataRows } from '@shared/components/common/empty-data-rows';
import { LoadMoreInView } from '@shared/components/common/load-more-in-view';
import { LoadingIndicator } from '@shared/components/common/loading-indicator';
import { SearchInput } from '@shared/components/common/search-input';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { APP_MOBILE_HEADER_HEIGHT } from '@shared/constants/layout';
import { useInfinitePagination } from '@shared/hooks/api/core/use-infinite-pagination';
import { useIsMobile } from '@shared/hooks/common/use-is-mobile';
import { defaultStore } from '@shared/libs/jotai/default-store';
import {
  openFeedbackDrawerAtom,
  mobileOpenFeedbackDrawerAtom,
  openMobileNewFeedbackDrawerAtom,
  openNewFeedbackDrawerAtom,
} from '@shared/states/modals-drawers';
import { computeMaxViewportHeight } from '@shared/utils/compute-max-viewport-height';

export const FeedbackSearchList = () => {
  const theme = useTheme();

  const isMobile = useIsMobile();

  const searchText = useAtomValue(feedbackSearchTextAtom);
  const openDrawer = useAtomValue(openFeedbackDrawerAtom);
  const openMobileDrawer = useAtomValue(mobileOpenFeedbackDrawerAtom);

  const { data, isFetchingMore, isLoading, loadMore } = useInfinitePagination(
    [API_CACHE_KEY.GET_FEEDBACK_LIST, searchText],
    (page) =>
      feedbackApi.getFeedbacks({
        filter: { searchQuery: searchText },
        metadata: { page, size: 20 },
      }),
    { skip: !(openDrawer || openMobileDrawer) },
  );

  const handleOpenNewFeedbackDrawer = () => {
    if (isMobile) {
      defaultStore.set(openMobileNewFeedbackDrawerAtom, true);
    } else {
      defaultStore.set(openNewFeedbackDrawerAtom, true);
    }
  };

  const feedbacks = data ? data.flatMap((i) => i.data.nodes) : [];

  const hasMore = (() => {
    const totalNodes =
      data?.reduce((acc, curr) => acc + curr.data.nodes.length, 0) ?? 0;

    return totalNodes < (data?.[0].data.metadata.totalDocs ?? 0);
  })();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          width: 1,
          height: SEARCH_INPUT_HEIGHT,
          py: 1.5,
          px: 2,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.catskillWhite,
          [theme.breakpoints.down('md')]: {
            height: MOBILE_SEARCH_INPUT_HEIGHT,
          },
        }}
      >
        <FormControl sx={{ flex: 1 }}>
          <SearchInput
            value={searchText}
            onChange={(value) => {
              defaultStore.set(feedbackSearchTextAtom, value);
            }}
          />
        </FormControl>
        <IconButton onClick={handleOpenNewFeedbackDrawer}>
          <PlusIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          overflowY: 'auto',
          height: computeMaxViewportHeight([SEARCH_INPUT_HEIGHT]),
          [theme.breakpoints.down('md')]: {
            height: computeMaxViewportHeight([
              APP_MOBILE_HEADER_HEIGHT,
              MOBILE_SEARCH_INPUT_HEIGHT,
            ]),
          },
        }}
      >
        {!data && isLoading && <LoadingIndicator />}
        {!isLoading && feedbacks.length === 0 && <EmptyDataRows />}
        {feedbacks.map((feedback) => (
          <FeedbackRow
            key={feedback.id}
            feedback={feedback}
          />
        ))}
        <LoadMoreInView
          hasMore={hasMore}
          onNext={loadMore}
          loading={isFetchingMore}
        />
      </Box>
    </>
  );
};
