import { IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';

import PenIcon from '@assets/icons/common/pen.svg';
import { GalleryTabs } from '@features/gallery/constants/common';
import {
  activeTabAtom,
  editModeActiveAtom,
} from '@features/gallery/states/common';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const FloatingEditButton = () => {
  const theme = useTheme();

  const activeTab = useAtomValue(activeTabAtom);

  const active = useAtomValue(editModeActiveAtom);

  if (active || activeTab === GalleryTabs.ManagersLogGallery) {
    return null;
  }

  return (
    <IconButton
      onClick={() => {
        defaultStore.set(editModeActiveAtom, true);
      }}
      sx={{
        position: 'fixed',
        zIndex: 1,
        bottom: 32,
        right: 32,
        [theme.breakpoints.down('md')]: {
          display: 'none',
        },
      }}
    >
      <PenIcon />
    </IconButton>
  );
};
