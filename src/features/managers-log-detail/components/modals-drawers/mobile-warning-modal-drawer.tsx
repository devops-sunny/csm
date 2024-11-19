import type { FunctionComponent } from 'react';
import { Button, Stack, Typography } from '@mui/material';

import { MobileFullScreenDrawer } from '@shared/components/common/mobile-full-screen-drawer';

export type MobileDiscardWarningDrawerProps = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export const MobileDiscardWarningDrawer: FunctionComponent<
  MobileDiscardWarningDrawerProps
> = ({ open, onConfirm, onCancel }) => (
  <MobileFullScreenDrawer
    open={open}
    onClose={onCancel}
    onOpen={onConfirm}
    title="Discard changes?"
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
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          fullWidth
          onClick={onConfirm}
        >
          Confirm
        </Button>
      </Stack>
    }
  >
    <Typography sx={{ m: 2 }}>
      Are you sure you want to discard the changes you&apos;ve made?
    </Typography>
  </MobileFullScreenDrawer>
);
