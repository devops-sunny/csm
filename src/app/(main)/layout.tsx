'use client';

import type { PropsWithChildren } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { FeedbackDrawer } from '@features/feedback/components/feedback-drawer';
import { MobileFeedbackDrawer } from '@features/feedback/components/mobile-feedback-drawer';
import { MobileNewFeedbackDrawer } from '@features/feedback/components/mobile-new-feedback-drawer';
import { NewFeedbackDrawer } from '@features/feedback/components/new-feedback-drawer';
import { AppHeader } from '@shared/components/app/app-header';
import { AppSidePanel } from '@shared/components/app/app-side-panel';
import { ImageViewModal } from '@shared/components/common/image-view-modal/image-view-modal';
import { APP_MOBILE_HEADER_HEIGHT } from '@shared/constants/layout';

export default function MainLayout({ children }: PropsWithChildren) {
  const theme = useTheme();

  return (
    <>
      <FeedbackDrawer />
      <MobileFeedbackDrawer />
      <NewFeedbackDrawer />
      <MobileNewFeedbackDrawer />
      <Box
        sx={{
          position: 'relative',
          boxSizing: 'border-box',
          height: '100dvh',
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          [theme.breakpoints.down('md')]: {
            pt: `${APP_MOBILE_HEADER_HEIGHT}px`,
          },
        }}
      >
        <AppHeader />
        <Box
          sx={{
            overflowX: 'hidden',
            overflowY: 'auto',
            display: 'grid',
            gridAutoFlow: 'column',
            gridAutoColumns: 'auto minmax(0, 1fr)',
            gridRow: '2 / 3',
          }}
        >
          <AppSidePanel />
          {children}
        </Box>
        <ImageViewModal />
      </Box>
    </>
  );
}
