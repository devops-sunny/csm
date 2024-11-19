import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useAtomValue } from 'jotai';
import toast from 'react-hot-toast';

import { useDeleteMedia } from '@features/gallery/hooks/api/use-delete-media';
import {
  editModeActiveAtom,
  selectedMediaIdsAtom,
} from '@features/gallery/states/common';
import { openDeleteMediaModalAtom } from '@features/gallery/states/modals-drawers';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { theme } from '@shared/libs/mui/theme';
import { toPluralText } from '@shared/utils/to-plural-text';

export const DeleteConfirmationModal = () => {
  const open = useAtomValue(openDeleteMediaModalAtom);

  const selectedMediaIds = useAtomValue(selectedMediaIdsAtom);

  const { trigger: deleteMedia, isMutating } = useDeleteMedia();

  const handleConfirm = async () => {
    const deletePromise = deleteMedia({
      mediaIds: selectedMediaIds,
    });

    await toast.promise(deletePromise, {
      loading: 'Deleting media...',
      success: 'Media deleted!',
      error: 'Failed to delete media',
    });

    defaultStore.set(openDeleteMediaModalAtom, false);
    defaultStore.set(selectedMediaIdsAtom, []);
    defaultStore.set(editModeActiveAtom, false);
  };

  const handleCancel = () => {
    defaultStore.set(openDeleteMediaModalAtom, false);
    defaultStore.set(selectedMediaIdsAtom, []);
    defaultStore.set(editModeActiveAtom, false);
  };

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
          Delete Media
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          height: 100,
          boxSizing: 'border-box',
          m: 0,
          p: 0,
        }}
      >
        <Typography sx={{ m: 2 }}>
          Are you sure you want to delete {selectedMediaIds.length} media{' '}
          {toPluralText('item', selectedMediaIds.length)}?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ gap: 4, height: 58, boxSizing: 'border-box' }}>
        <Button
          sx={{ px: 7 }}
          variant="contained"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <LoadingButton
          sx={{ px: 7, backgroundColor: theme.palette.salmonPearl }}
          onClick={handleConfirm}
          loading={isMutating}
        >
          Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
