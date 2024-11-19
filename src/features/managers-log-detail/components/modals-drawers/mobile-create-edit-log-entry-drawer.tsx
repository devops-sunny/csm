import { LoadingButton } from '@mui/lab';
import { Box, Button, Stack } from '@mui/material';
import { useAtomValue } from 'jotai';

import { RenderLogType } from '@features/managers-log-detail/components/common/render-log-type';
import { useMutateNewLogEntry } from '@features/managers-log-detail/hooks/api/use-mutate-new-log-entry';
import { useMutateUpdateLogEntry } from '@features/managers-log-detail/hooks/api/use-mutate-update-log-entry';
import { createEditLogEntryModalAtom } from '@features/managers-log-detail/states/modals-drawers';
import { MobileFullScreenDrawer } from '@shared/components/common/mobile-full-screen-drawer';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const MobileCreateEditLogEntryDrawer = () => {
  const createEditLogEntry = useAtomValue(createEditLogEntryModalAtom);

  const open = Boolean(createEditLogEntry);

  const isUpdate = Boolean(createEditLogEntry?.id);

  const { trigger: addNewLogEntry, isMutating: addNewLogEntryLoading } =
    useMutateNewLogEntry();

  const { trigger: updateLogEntry, isMutating: updateLoading } =
    useMutateUpdateLogEntry();

  const handleCreateLog = () => {
    if (!createEditLogEntry) return;

    if (isUpdate) {
      updateLogEntry({
        entryId: createEditLogEntry.id,
        sectionId: createEditLogEntry.sectionId,
        managerLogId: createEditLogEntry.managerLogId,
        mediaType: createEditLogEntry.mediaType,
        description: createEditLogEntry.description,
        mediaFiles: createEditLogEntry.mediaFiles,
      });
    } else {
      addNewLogEntry({
        sectionId: createEditLogEntry.sectionId,
        managerLogId: createEditLogEntry.managerLogId,
        mediaType: createEditLogEntry.mediaType,
        description: createEditLogEntry.description,
        mediaFiles: createEditLogEntry.mediaFiles,
      });
    }
  };

  const hasContent =
    Boolean(createEditLogEntry?.description) ||
    createEditLogEntry?.mediaFiles?.length;

  return (
    <MobileFullScreenDrawer
      open={open}
      onClose={() => {
        defaultStore.set(createEditLogEntryModalAtom, null);
      }}
      onOpen={() => {
        defaultStore.set(createEditLogEntryModalAtom, createEditLogEntry);
      }}
      title={isUpdate ? createEditLogEntry?.sectionName : 'Create Log Entry'}
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
              defaultStore.set(createEditLogEntryModalAtom, null);
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            fullWidth
            onClick={handleCreateLog}
            loading={addNewLogEntryLoading || updateLoading}
            disabled={!hasContent}
          >
            Save
          </LoadingButton>
        </Stack>
      }
    >
      <Box sx={{ height: 1, display: 'grid' }}>
        <RenderLogType
          logType={createEditLogEntry?.mediaType}
          logEntry={createEditLogEntry}
        />
      </Box>
    </MobileFullScreenDrawer>
  );
};
