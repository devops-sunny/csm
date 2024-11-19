import { Box, Paper, useTheme } from '@mui/material';

import { CheckListItem } from '@features/dashboard/components/my-checklist/check-list-item';
import { DASHBOARD_CELL_RATIO } from '@features/dashboard/constants/layout';

const CHECKLIST_MOBILE_ITEM_HEIGHT = 92;

export const MyChecklist = () => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        width: 1,
        height: 1,
        position: 'relative',
        [theme.breakpoints.down('md')]: {
          aspectRatio: DASHBOARD_CELL_RATIO,
          height: CHECKLIST_MOBILE_ITEM_HEIGHT * 4,
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
        {[
          {
            taskName: 'Check Food Inventory',
            taskType: 'Inventory',
            dueDate: '12/13/21',
          },
          {
            taskName: 'Clean Kitchen',
            taskType: 'Cleaning',
            dueDate: '12/14/21',
          },
          {
            taskName: 'Update Menu',
            taskType: 'Menu',
            dueDate: '12/15/21',
          },
          {
            taskName: 'Train New Staff',
            taskType: 'Training',
            dueDate: '12/16/21',
          },
          {
            taskName: 'Order Supplies',
            taskType: 'Supplies',
            dueDate: '12/17/21',
          },
          {
            taskName: 'Check Table Reservations',
            taskType: 'Reservations',
            dueDate: '12/18/21',
          },
          {
            taskName: 'Review Health and Safety Protocols',
            taskType: 'Safety',
            dueDate: '12/19/21',
          },
          {
            taskName: 'Plan Specials',
            taskType: 'Menu',
            dueDate: '12/20/21',
          },
          {
            taskName: 'Check Equipment',
            taskType: 'Maintenance',
            dueDate: '12/21/21',
          },
          {
            taskName: 'Review Customer Feedback',
            taskType: 'Customer Service',
            dueDate: '12/22/21',
          },
        ].map((item) => (
          <CheckListItem
            key={item.taskName}
            {...item}
          />
        ))}
      </Box>
    </Paper>
  );
};
