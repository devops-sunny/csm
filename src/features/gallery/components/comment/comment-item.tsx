import { type FunctionComponent } from 'react';
import { Avatar, Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import toast from 'react-hot-toast';

import { useDeleteComment } from '@features/gallery/hooks/api/use-delete-comment';
import type { MenuItemConfig } from '@shared/components/common/context-menu';
import { ContextMenu } from '@shared/components/common/context-menu';
import { LongPressListener } from '@shared/components/common/long-press-listener';
import { US_SHORT_DATE_FORMAT } from '@shared/constants/common';
import { selfProfileData } from '@shared/states/common';
import type { ApiType } from '@shared/types/utils/api';

export type CommentItemProps = {
  comment: ApiType['FacilityMediaCommentResponse'];
};

export const CommentItem: FunctionComponent<CommentItemProps> = ({
  comment,
}) => {
  const theme = useTheme();

  const selfProfile = useAtomValue(selfProfileData);

  const {
    id,
    createdBy,
    comment: content,
    fullName,
    createdAt,
    profilePicture,
  } = comment;

  const { trigger: deleteComment } = useDeleteComment();

  const handleDeleteComment = () => {
    if (!id) return;

    const deletePromise = deleteComment({ id });

    toast.promise(deletePromise, {
      loading: 'Deleting comment...',
      success: 'Comment deleted',
      error: 'Failed to delete comment',
    });
  };

  const menuItems: MenuItemConfig[] = [
    {
      label: (
        <Typography
          component="span"
          sx={{ color: theme.palette.salmonPearl, fontWeight: 500 }}
        >
          Delete
        </Typography>
      ),
      onClick: handleDeleteComment,
    },
  ];

  const isSelfComment = selfProfile?.id === createdBy;

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box sx={{ ml: 5, mb: 0.5 }}>
          <Typography
            fontWeight={500}
            whiteSpace="normal"
            sx={{
              [theme.breakpoints.down('md')]: {
                fontSize: 13,
              },
            }}
          >
            {isSelfComment ? 'Me' : fullName}
          </Typography>
          <Typography
            sx={{
              fontSize: 10,
              [theme.breakpoints.down('md')]: {
                fontSize: 12,
              },
            }}
          >
            {dayjs(createdAt).format(US_SHORT_DATE_FORMAT)}
          </Typography>
        </Box>
      </Stack>
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          alignItems: 'flex-start',
          position: 'relative',
          ':hover': {
            '.desktop-context-menu': {
              opacity: 1,
            },
          },
        }}
      >
        <Avatar
          sx={{ width: 30, height: 30, flexShrink: 0 }}
          src={profilePicture}
        />
        <LongPressListener
          sx={{
            borderRadius: '0px 20px 30px 30px',
            pt: 1.75,
            pb: 2.5,
            pr: 0.5,
            px: 3,
            backgroundColor: theme.palette.catskillWhite,
            width: 'fit-content',
            position: 'relative',
            cursor: 'pointer',
            textAlign: 'left',
            ...(isSelfComment && {
              backgroundColor: theme.palette.blueberry,
            }),
          }}
        >
          {({ pressed }) => (
            <>
              <Typography
                sx={{
                  whiteSpace: 'normal',
                  wordBreak: 'break-all',
                  fontSize: 12,
                  userSelect: 'none',
                  [theme.breakpoints.down('md')]: {
                    fontSize: 14,
                  },
                  ...(isSelfComment && {
                    color: theme.palette.white,
                  }),
                }}
              >
                {content}
              </Typography>
              <ContextMenu
                className="mobile-context-menu"
                open={pressed}
                menuItems={menuItems}
                AnchorComponent={<Box />}
                disablePortal={false}
                sx={{ position: 'absolute', right: 8, top: 8 }}
              />
            </>
          )}
        </LongPressListener>
        <ContextMenu
          className="desktop-context-menu"
          sx={{
            position: 'absolute',
            right: -20,
            top: 0,
            opacity: 0,
            transition: 'opacity 0.2s',
            [theme.breakpoints.down('md')]: {
              display: 'none',
            },
          }}
          menuItems={menuItems}
        />
      </Box>
    </Box>
  );
};
