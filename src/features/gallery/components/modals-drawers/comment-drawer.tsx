import { Drawer } from '@mui/material';
import { useAtomValue } from 'jotai';

import { CommentView } from '@features/gallery/components/comment/comment-view';
import { openChatDrawerAtom } from '@features/gallery/states/modals-drawers';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const CommentDrawer = () => {
  const chatDrawerData = useAtomValue(openChatDrawerAtom);

  const open = Boolean(chatDrawerData);

  return (
    <Drawer
      open={open}
      anchor="right"
      onClose={() => defaultStore.set(openChatDrawerAtom, null)}
      PaperProps={{
        sx: {
          width: 330,
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
      <CommentView />
    </Drawer>
  );
};
