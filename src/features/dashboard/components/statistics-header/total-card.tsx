import type { FunctionComponent, ReactNode } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export type TotalCardProps = {
  illustrator: ReactNode;
  figureColor: string;
  label: string;
  value: string;
};

export const TotalCard: FunctionComponent<TotalCardProps> = ({
  illustrator,
  figureColor,
  label,
  value,
}) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{ height: 60, flex: 1, display: 'flex', overflow: 'hidden    ' }}
    >
      <Box
        sx={{
          width: 45,
          backgroundColor: figureColor,
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {illustrator}
      </Box>
      <Box sx={{ px: 2, py: 1 }}>
        <Typography
          fontSize={12}
          fontWeight={500}
          textTransform="uppercase"
        >
          {label}
        </Typography>
        <Typography
          fontSize={20}
          sx={{ color: theme.palette.cadetBlue }}
        >
          {value}
        </Typography>
      </Box>
    </Paper>
  );
};
