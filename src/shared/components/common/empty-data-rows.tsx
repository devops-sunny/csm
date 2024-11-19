import type { FunctionComponent } from 'react';
import { Typography } from '@mui/material';

export type EmptyDataRowsProps = {
  message?: string;
};

export const EmptyDataRows: FunctionComponent<EmptyDataRowsProps> = ({
  message,
}) => (
  <Typography
    variant="h2"
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textTransform: 'uppercase',
    }}
  >
    {message ?? 'No data'}
  </Typography>
);
