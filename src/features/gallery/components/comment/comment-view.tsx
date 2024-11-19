import type { BaseSyntheticEvent } from 'react';
import { useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';
import toast from 'react-hot-toast';

import { CommentItem } from '@features/gallery/components/comment/comment-item';
import { useCreateComment } from '@features/gallery/hooks/api/use-create-comment';
import { useInfinitePaginationMediaComments } from '@features/gallery/hooks/api/use-infinite-pagination-media-comments';
import {
  openChatDrawerAtom,
  openMobileChatDrawerAtom,
} from '@features/gallery/states/modals-drawers';
import { EmptyDataRows } from '@shared/components/common/empty-data-rows';
import { LoadMoreInView } from '@shared/components/common/load-more-in-view';
import { LoadingIndicator } from '@shared/components/common/loading-indicator';
import { useIsMobile } from '@shared/hooks/common/use-is-mobile';

export const CommentView = () => {
  const [newComment, setNewComment] = useState('');

  const theme = useTheme();

  const isMobile = useIsMobile();

  const chatDrawerData = useAtomValue(openChatDrawerAtom);

  const mobileChatDrawerData = useAtomValue(openMobileChatDrawerAtom);

  const mediaId = (() => {
    if (isMobile) {
      return mobileChatDrawerData?.mediaId;
    }

    return chatDrawerData?.mediaId;
  })();

  const { data, isLoading, isFetchingMore, loadMore } =
    useInfinitePaginationMediaComments();

  const { trigger: createComment } = useCreateComment();

  const handleCreateComment = async (event: BaseSyntheticEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (!mediaId || !newComment) return;

    if (newComment.length > 255) {
      toast.error('Comment must be less than 255 characters');

      return;
    }

    await createComment({
      facilityMediaId: mediaId,
      comment: newComment,
    });

    setNewComment('');
  };

  const allComments = data?.flatMap((i) => i.data.nodes) ?? [];

  const isEmpty = data?.[0].data.nodes.length === 0;

  const hasMore = (() => {
    const totalNodes =
      data?.reduce((acc, curr) => acc + curr.data.nodes.length, 0) ?? 0;

    return totalNodes < (data?.[0].data.metadata.totalDocs ?? 0);
  })();

  return (
    <Stack
      sx={{
        userSelect: 'none',
        display: 'flex',
        flexFlow: 'column',
        height: 1,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexFlow: 'column',
          flex: 1,
          gap: 3.5,
          py: 2.25,
          pl: 3.75,
          pr: 4.5,
          boxSizing: 'border-box',
          overflowY: 'scroll',
          overflowX: 'hidden',
          [theme.breakpoints.down('md')]: {
            py: 4.5,
            pl: 3.5,
            pr: 4.5,
          },
        }}
      >
        {!data && isLoading && <LoadingIndicator />}
        {!isLoading && isEmpty && <EmptyDataRows message="No Comment" />}
        {allComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
          />
        ))}
        <LoadMoreInView
          hasMore={hasMore}
          onNext={loadMore}
          loading={isFetchingMore}
        />
      </Box>
      <FormControl
        sx={{
          flexShrink: 0,
          backgroundColor: theme.palette.catskillWhite,
          py: 1.5,
          px: 2,
          boxSizing: 'border-box',
          [theme.breakpoints.down('md')]: {
            py: 1,
          },
        }}
      >
        <TextField
          placeholder="Comment"
          multiline
          onChange={(event) => setNewComment(event.target.value)}
          value={newComment}
          autoFocus
          autoComplete="off"
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              handleCreateComment(event);
            }
          }}
          sx={{
            '.MuiOutlinedInput-root': {
              height: 1,
              alignItems: 'flex-end',
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleCreateComment}
                  disabled={!newComment}
                  size="icon-only"
                  sx={{
                    color: theme.palette.blueberry,
                    mr: 1,
                    mb: 3,
                  }}
                >
                  <ArrowUpwardIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    </Stack>
  );
};
