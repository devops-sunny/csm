'use client';

import { Dialog, DialogTitle, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';

import { DeleteLogEntry } from '@features/managers-log-detail/components/common/delete-log-entry';
import { deleteEntryIdModalAtom } from '@features/managers-log-detail/states/modals-drawers';

export const DeleteLogEntryModal = () => {
  const theme = useTheme();

  const logEntryId = useAtomValue(deleteEntryIdModalAtom);

  const open = Boolean(logEntryId);

  return (
    <Dialog open={open}>
      <DialogTitle
        sx={{
          flexFlow: 'row',
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: theme.palette.white }}
        >
          Delete Log Entry
        </Typography>
      </DialogTitle>
      <DeleteLogEntry />
    </Dialog>
  );
};
