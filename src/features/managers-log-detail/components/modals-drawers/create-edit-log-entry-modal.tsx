'use client';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';

import { RenderLogType } from '@features/managers-log-detail/components/common/render-log-type';
import { useMutateNewLogEntry } from '@features/managers-log-detail/hooks/api/use-mutate-new-log-entry';
import { useMutateUpdateLogEntry } from '@features/managers-log-detail/hooks/api/use-mutate-update-log-entry';
import { createEditLogEntryModalAtom } from '@features/managers-log-detail/states/modals-drawers';
import { US_SHORT_DATE_FORMAT } from '@shared/constants/common';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const CreateEditLogEntryModal = () => {
  const theme = useTheme();

  const createEditLogEntry = useAtomValue(createEditLogEntryModalAtom);

  const isUpdate = Boolean(createEditLogEntry?.id);

  const { trigger: addNewLogEntry, isMutating: addNewLoading } =
    useMutateNewLogEntry();

  const { trigger: updateLogEntry, isMutating: updateLoading } =
    useMutateUpdateLogEntry();

  const handleCreateLog = () => {
    if (!createEditLogEntry) return;

    if (isUpdate) {
      updateLogEntry({
        entryId: createEditLogEntry.id,
        sectionId: createEditLogEntry.sectionId,
        managerLogId: createEditLogEntry.managerLogId,
        mediaType: createEditLogEntry.mediaType,
        description: createEditLogEntry.description,
        mediaFiles: createEditLogEntry.mediaFiles,
      });
    } else {
      addNewLogEntry({
        sectionId: createEditLogEntry.sectionId,
        managerLogId: createEditLogEntry.managerLogId,
        mediaType: createEditLogEntry.mediaType,
        description: createEditLogEntry.description,
        mediaFiles: createEditLogEntry.mediaFiles,
      });
    }
  };

  const open = Boolean(createEditLogEntry);

  const hasContent =
    Boolean(createEditLogEntry?.description) ||
    createEditLogEntry?.mediaFiles?.length;

  return (
    <Dialog
      open={open}
      sx={{
        [theme.breakpoints.down('md')]: {
          display: 'none',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          flexFlow: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 1.25,
          height: 54,
          boxSizing: 'border-box',
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: theme.palette.white }}
        >
          {isUpdate ? createEditLogEntry?.sectionName : 'Create Log Entry'}
        </Typography>
        {isUpdate && (
          <Typography
            sx={{ color: theme.palette.white, fontSize: 11, fontWeight: 500 }}
          >
            Updated:
            <br />
            {dayjs(createEditLogEntry?.updatedAt).format(US_SHORT_DATE_FORMAT)}
          </Typography>
        )}
      </DialogTitle>
      <DialogContent
        sx={{
          width: 800,
          height: 550,
          boxSizing: 'border-box',
          m: 0,
          p: 0,
          display: 'grid',
          gridTemplateRows: '1fr',
        }}
      >
        <RenderLogType
          logType={createEditLogEntry?.mediaType}
          logEntry={createEditLogEntry}
        />
      </DialogContent>
      <DialogActions sx={{ gap: 7, height: 58, boxSizing: 'border-box' }}>
        <Button
          sx={{ px: 7 }}
          variant="contained"
          onClick={() => {
            defaultStore.set(createEditLogEntryModalAtom, null);
          }}
        >
          Cancel
        </Button>
        <LoadingButton
          sx={{ px: 7 }}
          disabled={!hasContent}
          onClick={handleCreateLog}
          loading={addNewLoading || updateLoading}
        >
          Save
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
