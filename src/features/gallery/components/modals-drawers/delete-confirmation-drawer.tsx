import { LoadingButton } from '@mui/lab';
import { Box, Button, DialogActions, Stack, Typography } from '@mui/material';
import { useAtomValue } from 'jotai';
import toast from 'react-hot-toast';

import { useDeleteMedia } from '@features/gallery/hooks/api/use-delete-media';
import {
  editModeActiveAtom,
  selectedMediaIdsAtom,
} from '@features/gallery/states/common';
import { mobileOpenDeleteMediaModalAtom } from '@features/gallery/states/modals-drawers';
import { MobileFullScreenDrawer } from '@shared/components/common/mobile-full-screen-drawer';
import { APP_MOBILE_FOOTER_ACTIONS_HEIGHT } from '@shared/constants/layout';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { theme } from '@shared/libs/mui/theme';
import { toPluralText } from '@shared/utils/to-plural-text';

export const DeleteConfirmationDrawer = () => {
  const open = useAtomValue(mobileOpenDeleteMediaModalAtom);

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

    defaultStore.set(mobileOpenDeleteMediaModalAtom, false);
    defaultStore.set(selectedMediaIdsAtom, []);
    defaultStore.set(editModeActiveAtom, false);
  };

  const handleCancel = () => {
    defaultStore.set(mobileOpenDeleteMediaModalAtom, false);
  };

  return (
    <MobileFullScreenDrawer
      open={open}
      onClose={handleCancel}
      onOpen={handleConfirm}
      title="Delete Media"
    >
      <Box sx={{ height: 1, display: 'flex', flexFlow: 'column' }}>
        <Typography sx={{ py: 3, px: 2 }}>
          Are you sure you want to delete {selectedMediaIds.length} media{' '}
          {toPluralText('item', selectedMediaIds.length)}?
        </Typography>
        <DialogActions
          sx={{
            mt: 'auto',
            backgroundColor: theme.palette.cello,
            height: APP_MOBILE_FOOTER_ACTIONS_HEIGHT,
            width: 1,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width={1}
            maxWidth={380}
            gap={4}
            height={APP_MOBILE_FOOTER_ACTIONS_HEIGHT}
            sx={{ backgroundColor: theme.palette.cello }}
          >
            <Button
              fullWidth
              variant="contained"
              onClick={handleCancel}
              sx={{ px: 7 }}
            >
              Cancel
            </Button>
            <LoadingButton
              fullWidth
              onClick={handleConfirm}
              loading={isMutating}
              sx={{ px: 7, backgroundColor: theme.palette.salmonPearl }}
            >
              Confirm
            </LoadingButton>
          </Stack>
        </DialogActions>
      </Box>
    </MobileFullScreenDrawer>
  );
};
