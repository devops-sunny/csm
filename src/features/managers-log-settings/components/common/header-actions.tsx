'use client';

import type { FunctionComponent } from 'react';
import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import type { SxProps } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/system';
import { useAtomValue } from 'jotai';

import {
  addEditModuleAtom,
  selectedFacilityIdAtom,
} from '@features/managers-log-settings/states/common';
import { loadModuleModalAtom } from '@features/managers-log-settings/states/modals-drawers';
import { defaultStore } from '@shared/libs/jotai/default-store';

export type HeaderActionsProps = {
  sx?: SxProps<Theme>;
};

export const HeaderActions: FunctionComponent<HeaderActionsProps> = ({
  sx,
}) => {
  const theme = useTheme();

  const selectedFacilityId = useAtomValue(selectedFacilityIdAtom);

  return (
    <Paper
      variant="sharp-edged"
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1px 1fr',
        gridTemplateRows: '1fr',
        alignItems: 'center',
        py: 1.25,
        px: 3.5,
        gap: 3.5,
        [theme.breakpoints.down('md')]: {
          display: 'none',
        },
        ...sx,
      }}
    >
      <Typography variant="body2">Modules</Typography>
      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
          ml: 'auto',
          width: 1,
        }}
      >
        <Button
          fullWidth
          disabled={!selectedFacilityId}
          sx={{ maxWidth: 150 }}
          onClick={() => {
            defaultStore.set(loadModuleModalAtom, true);
          }}
        >
          Load Setup
        </Button>
        <Button
          fullWidth
          sx={{ maxWidth: 150 }}
          disabled={!selectedFacilityId}
          onClick={() => {
            defaultStore.set(addEditModuleAtom, {});
          }}
        >
          Add Module
        </Button>
      </Box>
      <Divider
        orientation="vertical"
        sx={{ height: 'calc(100% + 10px)', mb: -1.25 }}
      />
      <Typography variant="body2">Daily emails of Managers Log</Typography>
    </Paper>
  );
};
