import { useAtomValue } from 'jotai';

import { DeleteLogEntry } from '@features/managers-log-detail/components/common/delete-log-entry';
import { mobileDeleteEntryIdModalAtom } from '@features/managers-log-detail/states/modals-drawers';
import { MobileFullScreenDrawer } from '@shared/components/common/mobile-full-screen-drawer';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const MobileDeleteLogEntryDrawer = () => {
  const deleteEntryId = useAtomValue(mobileDeleteEntryIdModalAtom);

  const open = Boolean(deleteEntryId);

  return (
    <MobileFullScreenDrawer
      open={open}
      onClose={() => {
        defaultStore.set(mobileDeleteEntryIdModalAtom, null);
      }}
      onOpen={() => {
        defaultStore.set(mobileDeleteEntryIdModalAtom, deleteEntryId);
      }}
      title="Delete Log Entry"
    >
      <DeleteLogEntry />
    </MobileFullScreenDrawer>
  );
};
