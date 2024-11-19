import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';

import { FOOTER_ACTIONS_HEIGHT } from '@features/gallery/constants/layout';
import {
  editModeActiveAtom,
  selectedMediaIdsAtom,
} from '@features/gallery/states/common';
import {
  mobileOpenDeleteMediaModalAtom,
  openDeleteMediaModalAtom,
} from '@features/gallery/states/modals-drawers';
import { useIsMobile } from '@shared/hooks/common/use-is-mobile';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const FooterActions = () => {
  const theme = useTheme();

  const editModeActive = useAtomValue(editModeActiveAtom);

  const isMobile = useIsMobile();

  const selectedMediaIds = useAtomValue(selectedMediaIdsAtom);

  const handleClickDelete = () => {
    if (isMobile) {
      defaultStore.set(mobileOpenDeleteMediaModalAtom, true);
    } else {
      defaultStore.set(openDeleteMediaModalAtom, true);
    }
  };

  if (!editModeActive) {
    return null;
  }

  const hasSelectedMedia = selectedMediaIds.length > 0;

  return (
    <Box
      sx={{
        mt: 'auto',
        height: FOOTER_ACTIONS_HEIGHT,
        boxSizing: 'border-box',
        backgroundColor: theme.palette.cello,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      }}
    >
      <Button
        sx={{ width: 160 }}
        onClick={() => {
          defaultStore.set(editModeActiveAtom, false);
          defaultStore.set(selectedMediaIdsAtom, []);
        }}
      >
        Cancel
      </Button>
      <Button
        sx={{
          width: 160,
          backgroundColor: `${theme.palette.salmonPearl} !important`,
          ':disabled': {
            opacity: 0.5,
          },
        }}
        onClick={handleClickDelete}
        disabled={!hasSelectedMedia}
      >
        Delete
      </Button>
    </Box>
  );
};
