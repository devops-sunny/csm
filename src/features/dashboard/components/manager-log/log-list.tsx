import { Box, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { dashboardApi } from '@features/dashboard/api/dashboard-api';
import { LogRow } from '@features/dashboard/components/manager-log/log-row';
import { DASHBOARD_CELL_RATIO } from '@features/dashboard/constants/layout';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { useRequest } from '@shared/hooks/api/core/use-request';

const LOG_LIST_MOBILE_ITEM_HEIGHT = 87;

export const LogList = () => {
  const theme = useTheme();

  const { data } = useRequest(
    [API_CACHE_KEY.GET_MANAGER_LOG_LIST],
    () => dashboardApi.getTaggedLogs({ size: 10, page: 1 }),
    { revalidateOnMount: true },
  );

  const taggedEntries = data?.data.entries ?? [];
  const visibleEntries =
    taggedEntries.length <= 4 ? taggedEntries.length || 1 : 4;

  return (
    <Paper
      sx={{
        width: 1,
        height: 1,
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
          aspectRatio: DASHBOARD_CELL_RATIO,
          height: LOG_LIST_MOBILE_ITEM_HEIGHT * visibleEntries,
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          overflow: 'auto',
          '> .log-row:not(:last-child)': {
            borderBottom: '1px solid',
            borderColor: theme.palette.catskillWhite,
          },
          px: 1.5,
        }}
      >
        {taggedEntries.map((taggedEntry) => (
          <LogRow
            key={taggedEntry.id}
            taggedEntry={taggedEntry}
          />
        ))}
      </Box>
    </Paper>
  );
};
