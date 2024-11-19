import { useState, type FunctionComponent } from 'react';
import type { SxProps, Theme } from '@mui/material';
import { FormControl, Select, MenuItem } from '@mui/material';
import { useAtomValue } from 'jotai';

import { DiscardWarningModal } from '@features/managers-log-detail/components/modals-drawers/discard-warning-modal';
import { MobileDiscardWarningDrawer } from '@features/managers-log-detail/components/modals-drawers/mobile-warning-modal-drawer';
import { createEditLogEntryAllowedTypeAtom } from '@features/managers-log-detail/states/common';
import { createEditLogEntryModalAtom } from '@features/managers-log-detail/states/modals-drawers';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { LogEntryType } from '@shared/types/api/generated';

export type LogTypeSelectProps = {
  sx?: SxProps<Theme>;
};

export const LogTypeSelect: FunctionComponent<LogTypeSelectProps> = ({
  sx,
}) => {
  const [openDiscardChangesConfirm, setOpenDiscardChangesConfirm] =
    useState(false);

  const [changingType, setChangingType] = useState<LogEntryType>();

  const createEditLogEntry = useAtomValue(createEditLogEntryModalAtom);

  const createEditLogEntryAllowedType = useAtomValue(
    createEditLogEntryAllowedTypeAtom,
  );

  const handleChangeType = (value: LogEntryType) => {
    const hasAnyData =
      Boolean(createEditLogEntry?.mediaFiles?.length) ||
      Boolean(createEditLogEntry?.description);

    if (hasAnyData) {
      setChangingType(value);

      setOpenDiscardChangesConfirm(true);
    } else {
      defaultStore.set(createEditLogEntryModalAtom, {
        ...createEditLogEntry,
        mediaType: value,
      });
    }
  };

  const handleConfirmDiscardChanges = () => {
    setOpenDiscardChangesConfirm(false);

    defaultStore.set(createEditLogEntryModalAtom, null);

    defaultStore.set(createEditLogEntryModalAtom, {
      ...createEditLogEntry,
      mediaFiles: [],
      description: '',
      mediaType: changingType,
    });
  };

  if (!createEditLogEntry) return null;

  return (
    <>
      <DiscardWarningModal
        open={openDiscardChangesConfirm}
        onCancel={() => setOpenDiscardChangesConfirm(false)}
        onConfirm={handleConfirmDiscardChanges}
      />
      <MobileDiscardWarningDrawer
        open={openDiscardChangesConfirm}
        onCancel={() => setOpenDiscardChangesConfirm(false)}
        onConfirm={handleConfirmDiscardChanges}
      />
      <FormControl
        sx={{
          width: {
            xs: '100%',
            md: 180,
          },
          flexShrink: 0,
          ...sx,
        }}
      >
        <Select
          value={createEditLogEntry.mediaType}
          onChange={({ target: { value } }) => {
            handleChangeType(value as LogEntryType);
          }}
        >
          {createEditLogEntryAllowedType.map((type) => (
            <MenuItem
              key={type}
              value={type}
            >
              {type === LogEntryType.TextImage && 'Text & Picture'}
              {type === LogEntryType.Album && 'Album'}
              {type === LogEntryType.Video && 'Video'}
              {type === LogEntryType.Document && 'Document'}
              {type === LogEntryType.Link && 'Link'}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
