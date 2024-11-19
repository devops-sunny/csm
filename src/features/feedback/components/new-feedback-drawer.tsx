import { Drawer } from '@mui/material';
import { useAtomValue } from 'jotai';

import { NewFeedbackForm } from '@features/feedback/components/new-feedback-form';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { openNewFeedbackDrawerAtom } from '@shared/states/modals-drawers';

export const NewFeedbackDrawer = () => {
  const open = useAtomValue(openNewFeedbackDrawerAtom);

  return (
    <Drawer
      open={open}
      onClose={() => {
        defaultStore.set(openNewFeedbackDrawerAtom, false);
      }}
      anchor="right"
      PaperProps={{
        sx: {
          width: 280,
          borderRadius: 0,
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'transparent',
          },
        },
      }}
    >
      <NewFeedbackForm />
    </Drawer>
  );
};
