'use client';

import LoadingButton from '@mui/lab/LoadingButton';
import { Typography, Button, Stack } from '@mui/material';
import { useAtomValue } from 'jotai';
import toast from 'react-hot-toast';

import { useMutationDeleteModule } from '@features/managers-log-settings/hooks/api/use-mutation-delete-module';
import { mobileDeleteModuleIdModalAtom } from '@features/managers-log-settings/states/modals-drawers';
import { MobileFullScreenDrawer } from '@shared/components/common/mobile-full-screen-drawer';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const MobileDeleteModuleDrawer = () => {
  const moduleId = useAtomValue(mobileDeleteModuleIdModalAtom);

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

    defaultStore.set(mobileDeleteModuleIdModalAtom, null);
  };

  return (
    <MobileFullScreenDrawer
      open={Boolean(open)}
      onClose={() => {
        defaultStore.set(mobileDeleteModuleIdModalAtom, null);
      }}
      onOpen={() => {
        defaultStore.set(mobileDeleteModuleIdModalAtom, null);
      }}
      title="Delete Log"
      footerActions={
        <Stack
          direction="row"
          justifyContent="space-between"
          width={1}
          maxWidth={380}
          gap={4}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              defaultStore.set(mobileDeleteModuleIdModalAtom, null);
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            fullWidth
            onClick={handleDelete}
            loading={deleteLoading}
          >
            Confirm
          </LoadingButton>
        </Stack>
      }
    >
      <Typography sx={{ p: 3 }}>
        Are you sure you want to delete this module? This action cannot be
        undone.
      </Typography>
    </MobileFullScreenDrawer>
  );
};
