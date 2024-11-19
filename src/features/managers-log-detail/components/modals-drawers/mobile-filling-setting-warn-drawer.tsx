import { Typography, Button, Stack } from '@mui/material';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';

import { mobileFillingSettingWarnDrawerAtom } from '@features/managers-log-detail/states/modals-drawers';
import { MobileFullScreenDrawer } from '@shared/components/common/mobile-full-screen-drawer';
import { AppRoute } from '@shared/constants/app-route';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const MobileFillingSettingWarnDrawer = () => {
  const router = useRouter();

  const open = useAtomValue(mobileFillingSettingWarnDrawerAtom);

  const handleConfirm = () => {
    defaultStore.set(mobileFillingSettingWarnDrawerAtom, false);

    router.push(AppRoute.ManagersLog);
  };

  return (
    <MobileFullScreenDrawer
      open={open}
      onClose={() => {
        defaultStore.set(mobileFillingSettingWarnDrawerAtom, false);
      }}
      onOpen={() => {
        defaultStore.set(mobileFillingSettingWarnDrawerAtom, true);
      }}
      title="Warning"
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
              defaultStore.set(mobileFillingSettingWarnDrawerAtom, false);
            }}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </Stack>
      }
    >
      <Typography sx={{ p: 3 }}>
        The weather and assignees fields are required. Please finish filling out
        these fields.
      </Typography>
    </MobileFullScreenDrawer>
  );
};
