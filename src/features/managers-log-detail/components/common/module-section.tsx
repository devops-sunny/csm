'use client';

import { type FunctionComponent } from 'react';
import { Box, Button, Divider, Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import type { SxProps, Theme } from '@mui/system';
import { useParams } from 'next/navigation';
import { useInView } from 'react-intersection-observer';

import { LogSection } from '@features/managers-log-detail/components/common/log-section';
import { useRequestLogEntries } from '@features/managers-log-detail/hooks/api/use-request-log-entries';
import { createEditLogEntryAllowedTypeAtom } from '@features/managers-log-detail/states/common';
import { createEditLogEntryModalAtom } from '@features/managers-log-detail/states/modals-drawers';
import { LoadingIndicator } from '@shared/components/common/loading-indicator';
import { MODULE_ID_PREFIX } from '@shared/constants/managers-log';
import { defaultStore } from '@shared/libs/jotai/default-store';
import type { ApiType } from '@shared/types/utils/api';

export type ModuleSectionProps = {
  sx?: SxProps<Theme>;
  module: ApiType['Module'];
  onInViewChange?: (inView: boolean, entry: IntersectionObserverEntry) => void;
};

export const ModuleSection: FunctionComponent<ModuleSectionProps> = ({
  sx,
  module,
  onInViewChange,
}) => {
  const theme = useTheme();

  const params = useParams();

  const { ref } = useInView({
    threshold: 0.005,
    onChange: onInViewChange,
  });

  const logId = params.logId as string;

  const { data: logEntryResponse, isValidating: logEntryLoading } =
    useRequestLogEntries();

  const { id, headerTitle, allowedTypes } = module;

  const handleOpenLogCreationModal = () => {
    const defaultLogEntry: ApiType['ManagerLogEntry'] = {
      managerLogId: Number(logId),
      mediaType: allowedTypes[0],
      description: '',
      mediaFiles: [],
      sectionId: id,
    };

    defaultStore.set(
      createEditLogEntryAllowedTypeAtom,
      allowedTypes as ApiType['LogEntryType'][],
    );

    defaultStore.set(createEditLogEntryModalAtom, defaultLogEntry);
  };

  const logEntries = logEntryResponse?.data.entries ?? [];

  const sectionLogEntries = logEntries.filter(
    (logEntry) => logEntry.sectionId === id,
  );

  return (
    <Paper
      ref={ref}
      id={`${MODULE_ID_PREFIX}${id}`}
      sx={{
        display: 'flex',
        flexFlow: 'column',
        p: 2.5,
        mx: 2,
        zIndex: 0,
        scrollMarginTop: 25,
        [theme.breakpoints.down('md')]: {
          scrollMarginTop: 75,
        },
        ...sx,
      }}
    >
      <Typography
        variant="h3"
        sx={{ color: theme.palette.azure, mb: 2.25 }}
      >
        {headerTitle}
      </Typography>
      <Stack
        minHeight={30}
        spacing={4.5}
      >
        {logEntryLoading && (
          <Box sx={{ position: 'relative' }}>
            <LoadingIndicator />
          </Box>
        )}
        {!logEntryLoading && sectionLogEntries.length === 0 && (
          <Typography textAlign="center">No records</Typography>
        )}
        {!logEntryLoading &&
          sectionLogEntries.map((logEntry) => (
            <LogSection
              key={logEntry.id}
              logEntry={logEntry}
              allowedTypes={allowedTypes}
            />
          ))}
      </Stack>
      <Divider sx={{ mt: 3 }} />
      <Button
        onClick={handleOpenLogCreationModal}
        sx={{
          mt: 1.25,
          width: 156,
          alignSelf: 'end',
          flexShrink: 0,
          [theme.breakpoints.down('md')]: {
            alignSelf: 'center',
          },
        }}
      >
        Add Record
      </Button>
    </Paper>
  );
};
