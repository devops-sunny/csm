'use client';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Paper, Tab } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';

import { FloatingEditButton } from '@features/gallery/components/common/floating-edit-button';
import { FooterActions } from '@features/gallery/components/common/footer-actions';
import { HeaderFilters } from '@features/gallery/components/common/header-filters';
import { ManagersLogGalleryTab } from '@features/gallery/components/common/managers-log-gallery-tab';
import { MobileFloatingActions } from '@features/gallery/components/common/mobile-floating-actions';
import { OtherPicturesTab } from '@features/gallery/components/common/other-pictures-tab';
import { CommentDrawer } from '@features/gallery/components/modals-drawers/comment-drawer';
import { DeleteConfirmationDrawer } from '@features/gallery/components/modals-drawers/delete-confirmation-drawer';
import { DeleteConfirmationModal } from '@features/gallery/components/modals-drawers/delete-confirmation-modal';
import { MobileCommentDrawer } from '@features/gallery/components/modals-drawers/mobile-comment-drawer';
import { GalleryTabs } from '@features/gallery/constants/common';
import {
  MOBILE_TABS_HEIGHT,
  TABS_HEIGHT,
} from '@features/gallery/constants/layout';
import {
  activeTabAtom,
  editModeActiveAtom,
} from '@features/gallery/states/common';
import { defaultStore } from '@shared/libs/jotai/default-store';

export default function PageGallery() {
  const activeTab = useAtomValue(activeTabAtom);

  const editModeActive = useAtomValue(editModeActiveAtom);

  const theme = useTheme();

  return (
    <>
      <DeleteConfirmationModal />
      <DeleteConfirmationDrawer />
      <CommentDrawer />
      <MobileCommentDrawer />
      <MobileFloatingActions />
      <FloatingEditButton />
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column',
          backgroundColor: theme.palette.catskillWhite,
        }}
      >
        <TabContext value={String(activeTab)}>
          <Paper
            variant="sharp-edged"
            sx={{
              height: TABS_HEIGHT,
              boxSizing: 'border-box',
              backgroundColor: theme.palette.catskillWhite,
              display: 'flex',
              justifyContent: 'space-between',
              px: 2,
              zIndex: 100,
              [theme.breakpoints.down('md')]: {
                height: MOBILE_TABS_HEIGHT,
              },
            }}
          >
            <TabList
              onChange={(_event, newValue) => {
                defaultStore.set(activeTabAtom, newValue as GalleryTabs);
              }}
              TabIndicatorProps={{ sx: { bottom: 0 } }}
              sx={{
                border: 'none',
                alignSelf: 'flex-end',
                flex: 1,
                '.MuiTabs-flexContainer': {
                  gap: 4,
                  [theme.breakpoints.down('md')]: {
                    justifyContent: 'center',
                  },
                },
              }}
            >
              <Tab
                disabled={editModeActive}
                label="Manager's Log Gallery"
                value={GalleryTabs.ManagersLogGallery}
              />
              <Tab
                label="Other Pictures"
                value={GalleryTabs.OtherPictures}
              />
            </TabList>
            <HeaderFilters />
          </Paper>
          <TabPanel value={GalleryTabs.ManagersLogGallery}>
            <ManagersLogGalleryTab />
          </TabPanel>
          <TabPanel value={GalleryTabs.OtherPictures}>
            <OtherPicturesTab />
          </TabPanel>
        </TabContext>
        <FooterActions />
      </Box>
    </>
  );
}
