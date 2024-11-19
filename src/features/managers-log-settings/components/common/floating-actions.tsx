import { Box, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';

import DownloadIcon from '@assets/icons/common/download.svg';
import PlusIcon from '@assets/icons/common/plus.svg';
import {
  mobileAddEditModuleAtom,
  selectedFacilityIdAtom,
} from '@features/managers-log-settings/states/common';
import { mobileLoadModuleModalAtom } from '@features/managers-log-settings/states/modals-drawers';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const FloatingActions = () => {
  const theme = useTheme();

  const selectedFacilityId = useAtomValue(selectedFacilityIdAtom);

  if (!selectedFacilityId) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        zIndex: 1,
        bottom: 16,
        right: 32,
        display: 'flex',
        gap: 2.75,
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      }}
    >
      <IconButton
        onClick={() => {
          defaultStore.set(mobileLoadModuleModalAtom, true);
        }}
      >
        <DownloadIcon />
      </IconButton>
      <IconButton
        onClick={() => {
          defaultStore.set(mobileAddEditModuleAtom, {});
        }}
      >
        <PlusIcon />
      </IconButton>
    </Box>
  );
};
