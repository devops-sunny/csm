import { useAtomValue } from 'jotai';

import { NewFeedbackForm } from '@features/feedback/components/new-feedback-form';
import { MobileFullScreenDrawer } from '@shared/components/common/mobile-full-screen-drawer';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { openMobileNewFeedbackDrawerAtom } from '@shared/states/modals-drawers';

export const MobileNewFeedbackDrawer = () => {
  const open = useAtomValue(openMobileNewFeedbackDrawerAtom);

  return (
    <MobileFullScreenDrawer
      open={open}
      onClose={() => {
        defaultStore.set(openMobileNewFeedbackDrawerAtom, false);
      }}
      onOpen={() => {
        defaultStore.set(openMobileNewFeedbackDrawerAtom, true);
      }}
      title="Send New Feedback"
    >
      <NewFeedbackForm />
    </MobileFullScreenDrawer>
  );
};
