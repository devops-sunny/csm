import { useAtomValue } from 'jotai';

import { FeedbackSearchList } from '@features/feedback/components/feedback-search-list';
import { MobileFullScreenDrawer } from '@shared/components/common/mobile-full-screen-drawer';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { mobileOpenFeedbackDrawerAtom } from '@shared/states/modals-drawers';

export const MobileFeedbackDrawer = () => {
  const open = useAtomValue(mobileOpenFeedbackDrawerAtom);

  return (
    <MobileFullScreenDrawer
      open={open}
      title="My Feedback"
      onOpen={() => {
        defaultStore.set(mobileOpenFeedbackDrawerAtom, true);
      }}
      onClose={() => {
        defaultStore.set(mobileOpenFeedbackDrawerAtom, false);
      }}
    >
      <FeedbackSearchList />
    </MobileFullScreenDrawer>
  );
};
