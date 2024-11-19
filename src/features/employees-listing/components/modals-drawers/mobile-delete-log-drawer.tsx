'use client';

import { LoadingButton } from '@mui/lab';
import { Button, Stack, Typography } from '@mui/material';
import { useAtomValue } from 'jotai';

import { useMutationDeleteLog } from '@features/managers-log-listing/hooks/api/use-mutation-delete-log';
import { mobileDeleteLogIdAtom } from '@features/managers-log-listing/states/common';
import { MobileFullScreenDrawer } from '@shared/components/common/mobile-full-screen-drawer';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const MobileDeleteLogDrawer = () => {
  const logId = useAtomValue(mobileDeleteLogIdAtom);

  const { trigger: deleteLog, isMutating: deleteLoading } =
    useMutationDeleteLog();

  const handleDelete = () => {
    if (!logId) return;

    deleteLog({ logId: String(logId) });
  };

  const open = Boolean(logId);

  return (
    <MobileFullScreenDrawer
      open={Boolean(open)}
      onClose={() => {
        defaultStore.set(mobileDeleteLogIdAtom, null);
      }}
      onOpen={() => {
        defaultStore.set(mobileDeleteLogIdAtom, null);
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
            onClick={() => {
              defaultStore.set(mobileDeleteLogIdAtom, null);
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
      <Typography sx={{ py: 3, px: 2 }}>
        Are you sure you want to delete this log? This action cannot be undone.
      </Typography>
    </MobileFullScreenDrawer>
  );
};
