import { useAtomValue } from 'jotai';

import { CommentView } from '@features/gallery/components/comment/comment-view';
import { openMobileChatDrawerAtom } from '@features/gallery/states/modals-drawers';
import { MobileFullScreenDrawer } from '@shared/components/common/mobile-full-screen-drawer';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const MobileCommentDrawer = () => {
  const chatDrawerData = useAtomValue(openMobileChatDrawerAtom);

  const open = Boolean(chatDrawerData);

  const handleClose = () => {
    defaultStore.set(openMobileChatDrawerAtom, null);
  };

  const handleConfirm = () => {
    defaultStore.set(openMobileChatDrawerAtom, null);
  };

  return (
    <MobileFullScreenDrawer
      open={open}
      onClose={handleClose}
      onOpen={handleConfirm}
      title={chatDrawerData?.mediaName}
    >
      <CommentView />
    </MobileFullScreenDrawer>
  );
};
