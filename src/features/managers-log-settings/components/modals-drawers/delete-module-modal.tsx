'use client';

import LoadingButton from '@mui/lab/LoadingButton';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  DialogActions,
  Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';
import toast from 'react-hot-toast';

import { useMutationDeleteModule } from '@features/managers-log-settings/hooks/api/use-mutation-delete-module';
import { deleteModuleIdModalAtom } from '@features/managers-log-settings/states/modals-drawers';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const DeleteModuleModal = () => {
  const theme = useTheme();

  const moduleId = useAtomValue(deleteModuleIdModalAtom);

  const open = Boolean(moduleId);

  const { trigger: deleteModule, isMutating: deleteLoading } =
    useMutationDeleteModule();

  const handleDelete = async () => {
    if (!moduleId) return;

    const deletePromise = deleteModule({ moduleId });

    await toast.promise(deletePromise, {
      loading: 'Deleting...',
      success: 'Deleted!',
      error: 'Delete failed!',
    });

    defaultStore.set(deleteModuleIdModalAtom, null);
  };

  return (
    <Dialog open={open}>
      <DialogTitle
        sx={{
          display: 'flex',
          flexFlow: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 54,
          py: 0,
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: theme.palette.white }}
        >
          Delete Module
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
          Are you sure you want to delete this module? This action cannot be
          undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ gap: 2 }}>
        <Button
          sx={{ px: 7 }}
          variant="contained"
          onClick={() => {
            defaultStore.set(deleteModuleIdModalAtom, null);
          }}
        >
          Cancel
        </Button>
        <LoadingButton
          sx={{ px: 7 }}
          onClick={handleDelete}
          loading={deleteLoading}
        >
          Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
