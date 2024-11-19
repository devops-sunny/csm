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
import { useAtomValue } from 'jotai';
import toast from 'react-hot-toast';

import { useMutationDeleteLog } from '@features/managers-log-listing/hooks/api/use-mutation-delete-log';
import { deleteLogIdAtom } from '@features/managers-log-listing/states/common';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const DeleteLogModal = () => {
  const theme = useTheme();

  const logId = useAtomValue(deleteLogIdAtom);

  const { trigger: deleteLog, isMutating: deleteLoading } =
    useMutationDeleteLog();

  const handleDelete = async () => {
    if (!logId) return;

    const deletePromise = deleteLog({ logId: String(logId) });

    toast.promise(deletePromise, {
      loading: 'Deleting...',
      success: 'Deleted!',
      error: 'Delete failed!',
    });
  };

  const open = Boolean(logId);

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
          Delete Log
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          width: 400,
          boxSizing: 'border-box',
          m: 0,
          p: 0,
        }}
      >
        <Typography sx={{ p: 3 }}>
          Are you sure you want to delete this log? This action cannot be
          undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ gap: 2 }}>
        <Button
          sx={{ px: 7 }}
          variant="contained"
          onClick={() => {
            defaultStore.set(deleteLogIdAtom, null);
          }}
        >
          Cancel
        </Button>
        <LoadingButton
          sx={{ px: 7 }}
          loading={deleteLoading}
          onClick={handleDelete}
        >
          Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
