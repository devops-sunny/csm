import type { FunctionComponent, PropsWithChildren } from 'react';
import { Box, Typography } from '@mui/material';

export type ChartSlideProps = PropsWithChildren<{
  label: string;
}>;

export const ChartSlide: FunctionComponent<ChartSlideProps> = ({
  label,
  children,
}) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateRows: '28px 1fr',
      width: 1,
      height: 1,
    }}
    className="keen-slider__slide"
  >
    <Typography
      variant="caption"
      sx={{ fontSize: 12, pt: 0.5, fontWeight: 600 }}
    >
      {label}
    </Typography>
    <Box sx={{ position: 'relative' }}>{children}</Box>
  </Box>
);
