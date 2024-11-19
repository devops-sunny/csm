import type { FunctionComponent } from 'react';
import { useRef, useState } from 'react';
import { TabContext } from '@mui/lab';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import type { SxProps } from '@mui/material';
import { Box, Divider, FormControl, Paper, Tab } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/system';
import dynamic from 'next/dynamic';

import { EmailList } from '@features/managers-log-settings/components/common/email-list';
import { MobileTabs } from '@features/managers-log-settings/constants/common';
import {
  MOBILE_FACILITY_SELECT_HEIGHT,
  MOBILE_TAB_LIST_HEIGHT,
} from '@features/managers-log-settings/constants/layout';
import { selectedFacilityIdAtom } from '@features/managers-log-settings/states/common';
import { MobileFacilitySelect } from '@shared/components/common/mobile-facility-select';
import { APP_MOBILE_HEADER_HEIGHT } from '@shared/constants/layout';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { computeMaxViewportHeight } from '@shared/utils/compute-max-viewport-height';

const DraggableModules = dynamic(
  () =>
    import(
      '@features/managers-log-settings/components/modules/draggable-modules'
    ).then((module) => module.DraggableModules),
  {
    ssr: false,
    loading: () => <Box sx={{ gridColumnStart: 1, gridColumnEnd: 3 }} />,
  },
);

export type TabsProps = {
  sx?: SxProps<Theme>;
};

export const Tabs: FunctionComponent<TabsProps> = ({ sx }) => {
  const [activeTab, setActiveTab] = useState<MobileTabs>(MobileTabs.Modules);

  const listRef = useRef<HTMLDivElement>(null);

  const theme = useTheme();

  const handleChange = (_event: React.SyntheticEvent, newValue: MobileTabs) => {
    setActiveTab(newValue);
  };

  return (
    <TabContext value={activeTab}>
      <TabList
        centered
        onChange={handleChange}
        sx={{
          display: 'none',
          height: MOBILE_TAB_LIST_HEIGHT,
          boxSizing: 'border-box',
          backgroundColor: theme.palette.white,
          [theme.breakpoints.down('md')]: {
            display: 'block',
          },
        }}
      >
        <Tab
          label="Modules"
          value={MobileTabs.Modules}
        />
        <Tab
          label="Log Emails"
          value={MobileTabs.LogEmails}
        />
      </TabList>
      <Paper
        variant="sharp-edged"
        sx={{
          px: 2,
          py: 1.5,
          height: MOBILE_FACILITY_SELECT_HEIGHT,
          boxSizing: 'border-box',
          display: 'none',
          boxShadow: '0px 4px 12px 0px #0000001A',
          [theme.breakpoints.down('md')]: {
            display: 'block',
          },
        }}
      >
        <FormControl
          fullWidth
          sx={{
            '& .MuiInputBase-root': {
              width: 1,
            },
          }}
        >
          <MobileFacilitySelect
            onChange={(value) => {
              defaultStore.set(selectedFacilityIdAtom, value);
            }}
          />
        </FormControl>
      </Paper>
      <TabPanel
        value={MobileTabs.Modules}
        sx={{
          p: 3.5,
          flex: 1,
          [theme.breakpoints.down('md')]: {
            position: 'relative',
            maxHeight: computeMaxViewportHeight([
              APP_MOBILE_HEADER_HEIGHT,
              MOBILE_TAB_LIST_HEIGHT,
              MOBILE_FACILITY_SELECT_HEIGHT,
            ]),
            boxSizing: 'border-box',
            overflowY: 'auto',
            p: 2,
          },
        }}
      >
        <Box
          ref={listRef}
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1px 1fr',
            height: 1,
            gap: 3.5,
            [theme.breakpoints.down('md')]: {
              display: 'flex',
              flexFlow: 'column',
              gap: 0,
              p: 0,
            },
            ...sx,
          }}
        >
          <DraggableModules />
          <Divider
            orientation="vertical"
            sx={{
              height: 'calc(100% + 56px)',
              mt: -3.5,
              [theme.breakpoints.down('md')]: {
                display: 'none',
              },
            }}
          />
          <EmailList
            sx={{
              [theme.breakpoints.down('md')]: {
                display: 'none',
              },
            }}
          />
        </Box>
      </TabPanel>
      <TabPanel
        value={MobileTabs.LogEmails}
        sx={{
          p: 0,
          [theme.breakpoints.down('md')]: {
            maxHeight: computeMaxViewportHeight([
              APP_MOBILE_HEADER_HEIGHT,
              MOBILE_TAB_LIST_HEIGHT,
              MOBILE_FACILITY_SELECT_HEIGHT,
            ]),
            boxSizing: 'border-box',
            overflowY: 'auto',
          },
        }}
      >
        <EmailList
          sx={{
            display: 'none',
            [theme.breakpoints.down('md')]: {
              display: 'flex',
              gap: 0,
            },
          }}
        />
      </TabPanel>
    </TabContext>
  );
};
