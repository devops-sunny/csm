import type { FunctionComponent } from 'react';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';

import { RenderLogType } from '@features/managers-log-detail/components/common/render-log-type';
import { createEditLogEntryAllowedTypeAtom } from '@features/managers-log-detail/states/common';
import {
  tagPeopleModalAtom,
  createEditLogEntryModalAtom,
  mobileTagPeopleModalAtom,
  mobileDeleteEntryIdModalAtom,
  deleteEntryIdModalAtom,
} from '@features/managers-log-detail/states/modals-drawers';
import { ContextMenu } from '@shared/components/common/context-menu';
import { useIsMobile } from '@shared/hooks/common/use-is-mobile';
import { defaultStore } from '@shared/libs/jotai/default-store';
import type { LogEntryType } from '@shared/types/api/generated';
import type { ApiType } from '@shared/types/utils/api';
import { getNormalizeFullName } from '@shared/utils/get-normalize-full-name';

export type LogSectionProps = {
  logEntry: ApiType['ManagerLogEntry'];
  allowedTypes: LogEntryType[];
};

export const LogSection: FunctionComponent<LogSectionProps> = ({
  logEntry,
  allowedTypes,
}) => {
  const theme = useTheme();
  const isMobile = useIsMobile();

  const { id, mediaType, user, createdAt, tags } = logEntry;

  const fullName = getNormalizeFullName(user?.firstName, user?.lastName);

  if (!id) return null;

  const handleDelete = () => {
    if (isMobile) {
      defaultStore.set(mobileDeleteEntryIdModalAtom, id);
    } else {
      defaultStore.set(deleteEntryIdModalAtom, id);
    }
  };

  const handleEdit = () => {
    defaultStore.set(createEditLogEntryModalAtom, logEntry);

    defaultStore.set(
      createEditLogEntryAllowedTypeAtom,
      allowedTypes as LogEntryType[],
    );
  };

  const handleTagPeople = () => {
    if (isMobile) {
      defaultStore.set(mobileTagPeopleModalAtom, {
        logEntryId: id,
        taggedUsers: tags,
      });
    } else {
      defaultStore.set(tagPeopleModalAtom, {
        logEntryId: id,
        taggedUsers: tags,
      });
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto auto',
          gap: 1,
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Avatar sx={{ height: 32, width: 32 }} />
        <Typography sx={{ fontSize: 14 }}>{fullName}</Typography>
        <Typography sx={{ width: 'fit-content', fontSize: 14 }}>
          {dayjs(createdAt).format('ddd, MMM D, YYYY')}
        </Typography>
        <ContextMenu
          sx={{
            [theme.breakpoints.down('md')]: {
              display: 'none',
            },
          }}
          menuItems={[
            { label: 'Edit', onClick: handleEdit },
            { label: 'Tag Users', onClick: handleTagPeople },
            { label: 'Share to Chat', onClick: () => {}, disabled: true },
            {
              label: 'Delete',
              onClick: handleDelete,
            },
          ]}
        />
      </Box>
      <Divider sx={{ mb: 2.5 }} />
      <RenderLogType
        logEntry={logEntry}
        logType={mediaType}
        readonly
      />
      {tags && (
        <Stack
          direction="row"
          flexWrap="wrap"
          sx={{
            width: 1,
            gap: 1,
            mt: 1.5,
          }}
        >
          {tags.map((tag) => (
            <Chip
              key={tag.id}
              label={`@${getNormalizeFullName(tag.firstName, tag.lastName)}`}
              size="small"
            />
          ))}
        </Stack>
      )}
      <Stack
        direction="row"
        sx={{
          display: 'none',
          width: 1,
          justifyContent: 'space-between',
          gap: 0.5,
          mt: 2.5,
          [theme.breakpoints.down('md')]: {
            display: 'flex',
          },
        }}
      >
        <Button
          variant="link"
          onClick={handleEdit}
        >
          Edit
        </Button>
        <Button
          variant="link"
          onClick={handleTagPeople}
        >
          Tag Users
        </Button>
        <Button
          disabled
          variant="link"
        >
          Share to Chat
        </Button>
        <Button
          variant="link"
          sx={{ color: theme.palette.salmonPearl }}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Stack>
    </Box>
  );
};
