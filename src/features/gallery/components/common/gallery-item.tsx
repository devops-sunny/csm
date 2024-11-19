import { type FunctionComponent } from 'react';
import { IconButton, SvgIcon, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box, Stack } from '@mui/system';
import { useAtomValue } from 'jotai';
import Image from 'next/image';

import ChatIcon from '@assets/icons/common/chat-bubble.svg';
import IconCheck from '@assets/icons/common/check-mark.svg';
import {
  editModeActiveAtom,
  selectedMediaIdsAtom,
} from '@features/gallery/states/common';
import {
  mobileOpenDeleteMediaModalAtom,
  openChatDrawerAtom,
  openDeleteMediaModalAtom,
  openMobileChatDrawerAtom,
} from '@features/gallery/states/modals-drawers';
import { ContextMenu } from '@shared/components/common/context-menu';
import { LongPressListener } from '@shared/components/common/long-press-listener';
import { useIsMobile } from '@shared/hooks/common/use-is-mobile';
import { defaultStore } from '@shared/libs/jotai/default-store';
import type { ApiType } from '@shared/types/utils/api';

export type GalleryItemProps = {
  media: ApiType['FacilityMediaResponse'];
  canBeDeleted?: boolean;
  selected?: boolean;
  onClick?: () => void;
};

export const GalleryItem: FunctionComponent<GalleryItemProps> = ({
  media,
  canBeDeleted,
  selected,
  onClick,
}) => {
  const theme = useTheme();

  const chatDrawer = useAtomValue(openChatDrawerAtom);
  const mobileChatDrawer = useAtomValue(openMobileChatDrawerAtom);

  const editModeActive = useAtomValue(editModeActiveAtom);

  const isMobile = useIsMobile();

  const { id, mediaUrl, mediaName, commentCount } = media;

  const handleLongPress = (pressed: boolean) => {
    if (!pressed || !canBeDeleted) return;

    defaultStore.set(editModeActiveAtom, true);

    const { id: mediaId } = media;

    defaultStore.set(selectedMediaIdsAtom, (prev) => {
      const isSelected = prev.includes(Number(mediaId));

      if (isSelected) {
        return prev.filter((prevId) => prevId !== mediaId);
      }

      return [...prev, mediaId];
    });
  };

  const handleDelete = () => {
    if (!id) return;

    if (isMobile) {
      defaultStore.set(mobileOpenDeleteMediaModalAtom, true);
    } else {
      defaultStore.set(openDeleteMediaModalAtom, true);
    }

    defaultStore.set(selectedMediaIdsAtom, [id]);
  };

  if (!id || !mediaUrl || !mediaName) return null;

  const chatDrawerMediaId = chatDrawer?.mediaId ?? mobileChatDrawer?.mediaId;

  const shouldHighlightImage =
    chatDrawer?.mediaId === id || mobileChatDrawer?.mediaId === id || selected;

  return (
    <Stack
      sx={{
        width: 1,
        position: 'relative',
        display: 'flex',
        flexFlow: 'column',
        gap: 1,
        cursor: 'pointer',
        ':hover': {
          '.context-menu': {
            opacity: 1,
            transition: 'opacity 0.2s',
          },
        },
      }}
    >
      {!editModeActive && (
        <ContextMenu
          menuItems={[
            {
              label: 'Comment',
              onClick: () => {
                defaultStore.set(openChatDrawerAtom, { mediaId: id });
              },
            },
            {
              hidden: !canBeDeleted,
              label: (
                <Typography
                  component="span"
                  sx={{ color: theme.palette.salmonPearl, fontWeight: 500 }}
                >
                  Delete
                </Typography>
              ),
              onClick: handleDelete,
            },
          ]}
          className="context-menu"
          sx={{
            position: 'absolute',
            right: -12,
            top: 0,
            opacity: 0,
            [theme.breakpoints.down('md')]: {
              display: 'none',
            },
          }}
        />
      )}
      <Box
        sx={{
          aspectRatio: 1,
          width: 1,
          position: 'relative',
          transition: 'filter 0.2s',
        }}
        onClick={onClick}
      >
        {editModeActive && (
          <IconButton
            size="icon-only"
            sx={{
              position: 'absolute',
              top: 10,
              right: 12,
              zIndex: 10,
              height: 20,
              width: 20,
              borderRadius: '50%',
              border: '2px solid',
              boxSizing: 'content-box',
              backgroundColor: theme.palette.catskillWhite,
              borderColor: theme.palette.catskillWhite,
              '&:hover': {
                backgroundColor: theme.palette.catskillWhite,
                color: theme.palette.catskillWhite,
              },
            }}
          >
            {selected && (
              <SvgIcon
                sx={{
                  backgroundColor: theme.palette.azure,
                  borderRadius: '50%',
                  width: 16,
                  height: 16,
                  p: 0.25,
                }}
              >
                <IconCheck />
              </SvgIcon>
            )}
          </IconButton>
        )}
        <LongPressListener
          sx={{
            width: 1,
            height: 1,
            position: 'relative',
            ':before': {
              content: '""',
              display: shouldHighlightImage ? 'block' : 'none',
              position: 'absolute',
              inset: 0,
              background: '#1A3055',
              opacity: 0.65,
              zIndex: 1,
            },
          }}
          onChange={handleLongPress}
        >
          <Image
            onContextMenu={(e) => {
              e.preventDefault();

              return false;
            }}
            src={mediaUrl}
            alt={mediaName}
            fill
            quality={50}
            loading="lazy"
            style={{
              objectFit: 'cover',
              WebkitUserSelect: 'none',
              WebkitTouchCallout: 'none',
              cursor: 'pointer',
            }}
            sizes="200px"
          />
        </LongPressListener>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'start',
        }}
      >
        <IconButton
          size="icon-only"
          sx={{
            color:
              chatDrawerMediaId === id
                ? theme.palette.blueberry
                : theme.palette.azure,
            position: 'relative',
            mr: 0.5,
            ...(commentCount === 0 && {
              color: theme.palette.cadetBlue,
            }),
          }}
          onClick={() => {
            if (isMobile) {
              defaultStore.set(openMobileChatDrawerAtom, {
                mediaId: id,
                mediaName,
              });
            } else {
              defaultStore.set(openChatDrawerAtom, { mediaId: id, mediaName });
            }
          }}
        >
          <ChatIcon />
        </IconButton>
        {Number(commentCount) > 0 && (
          <Typography mr={1}>{commentCount}</Typography>
        )}
        <Typography noWrap>{mediaName}</Typography>
      </Box>
    </Stack>
  );
};
