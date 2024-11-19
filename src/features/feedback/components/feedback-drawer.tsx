import { Drawer } from '@mui/material';
import { useAtomValue } from 'jotai';

import { FeedbackSearchList } from '@features/feedback/components/feedback-search-list';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { openFeedbackDrawerAtom } from '@shared/states/modals-drawers';

export const FeedbackDrawer = () => {
  const open = useAtomValue(openFeedbackDrawerAtom);

  return (
    <Drawer
      open={open}
      onClose={() => {
        defaultStore.set(openFeedbackDrawerAtom, false);
      }}
      anchor="right"
      PaperProps={{
        sx: { width: 280, borderRadius: 0 },
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'transparent',
          },
        },
      }}
    >
      <FeedbackSearchList />
    </Drawer>
  );
};
