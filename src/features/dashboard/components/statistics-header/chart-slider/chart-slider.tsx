import { useState, type FunctionComponent, type MouseEvent } from 'react';
import { Box, IconButton, Paper, Stack, useTheme } from '@mui/material';
import { useKeenSlider } from 'keen-slider/react';

import ChevronRightRoundedIcon from '@assets/icons/common/chevron-right-rounded.svg';
import { ChartSlide } from '@features/dashboard/components/statistics-header/chart-slider/chart-slide';
import { HourChart } from '@features/dashboard/components/statistics-header/chart-slider/hour-chart';
import { ValueChart } from '@features/dashboard/components/statistics-header/chart-slider/value-chart';

import 'keen-slider/keen-slider.min.css';

export type ChartViewerProps = object;

export const ChartSlider: FunctionComponent<ChartViewerProps> = () => {
  const theme = useTheme();

  const [loaded, setLoaded] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setTimeout(() => setLoaded(true), 0);
    },
  });

  return (
    <Paper
      sx={{
        px: 1.5,
        mb: 2,
        position: 'relative',
        flexGrow: 1,
        '& .slider-arrow, & .slider-arrow:disabled': {
          position: 'absolute',
          top: '50%',
          opacity: 0,
        },
        [theme.breakpoints.up('md')]: {
          '&:hover .slider-arrow:not(:disabled)': {
            opacity: 1,
            color: theme.palette.blueberry,
          },
        },
      }}
    >
      <Box
        ref={sliderRef}
        className="keen-slider"
        sx={{
          overflow: 'hidden',
          width: 1,
          height: 1,
        }}
      >
        <ChartSlide label="Value">{loaded && <ValueChart />}</ChartSlide>
        <ChartSlide label="Hour">
          {loaded && <HourChart isAnimationActive={false} />}
        </ChartSlide>
      </Box>
      {instanceRef.current && loaded && (
        <>
          <IconButton
            className="slider-arrow"
            size="icon-only"
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              instanceRef.current?.prev();
            }}
            disabled={currentSlide === 0}
            sx={{
              left: -12,
              transform: 'translateY(-50%) rotate(180deg)',
            }}
          >
            <ChevronRightRoundedIcon />
          </IconButton>
          <IconButton
            className="slider-arrow"
            size="icon-only"
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              instanceRef.current?.next();
            }}
            disabled={
              currentSlide ===
              instanceRef.current.track.details.slides.length - 1
            }
            sx={{
              right: -12,
              transform: 'translateY(-50%)',
            }}
          >
            <ChevronRightRoundedIcon />
          </IconButton>
        </>
      )}
      {instanceRef.current && loaded && (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            mt: 1,
          }}
        >
          {[0, 1].map((idx) => (
            <Box
              key={idx}
              onClick={() => {
                instanceRef.current?.moveToIdx(idx);
              }}
              sx={{
                width: 9,
                height: 9,
                borderRadius: '100%',
                background: 'red',
                backgroundColor:
                  currentSlide === idx
                    ? theme.palette.azure
                    : theme.palette.blueHaze,
              }}
            />
          ))}
        </Stack>
      )}
    </Paper>
  );
};
