import type { FunctionComponent } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export type CheckListItemProps = {
  taskName: string;
  taskType: string;
  dueDate: string;
};

export const CheckListItem: FunctionComponent<CheckListItemProps> = ({
  taskName,
  taskType,
  dueDate,
}) => {
  const theme = useTheme();

  return (
    <Box
      className="log-row"
      sx={{
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '1fr auto',
        boxSizing: 'border-box',
        minHeight: 'calc(100% / 5)',
        height: 92,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexGrow: 1,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: 500,
              mb: 0.5,
              [theme.breakpoints.down('md')]: {
                fontSize: 14,
                maxWidth: '22ch',
              },
            }}
            noWrap
          >
            {taskName}
          </Typography>
          <Typography
            noWrap
            sx={{ [theme.breakpoints.down('md')]: { fontSize: 14 } }}
          >
            {taskType}
          </Typography>
          <Typography
            sx={{ mr: 3.5, [theme.breakpoints.down('md')]: { fontSize: 14 } }}
          >
            Due: {dueDate}
          </Typography>
        </Box>
      </Box>
      <Button
        sx={{
          width: 110,
          mr: 2,
          [theme.breakpoints.down('md')]: {
            mr: 0,
          },
        }}
      >
        Complete
      </Button>
    </Box>
  );
};
