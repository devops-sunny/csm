import { useEffect, useState, type MouseEvent } from 'react';
import { Box, IconButton, Modal, Paper, Zoom, useTheme } from '@mui/material';
import { useAtomValue } from 'jotai';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';

import ChevronRightRoundedIcon from '@assets/icons/common/chevron-right-rounded.svg';
import { KeyboardControlsPlugin } from '@shared/libs/keen-slider/keyboard-plugin';
import { closeImageViewModal } from '@shared/services/control-image-view-modal';
import { imageViewModalAtom } from '@shared/states/modals-drawers';

import 'keen-slider/keen-slider.min.css';

export const ImageViewModal = () => {
  const theme = useTheme();

  const {
    open,
    mediaList = [],
    initialSlideIdx = 0,
    FooterComponent,
  } = useAtomValue(imageViewModalAtom);

  const [currentSlide, setCurrentSlide] = useState(0);

  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      slideChanged: (slider) => setCurrentSlide(slider.track.details.rel),
      created: (slider) => {
        setLoaded(true);
        slider.container.focus();
      },
      destroyed: () => setLoaded(false),
    },
    [KeyboardControlsPlugin],
  );

  useEffect(() => {
    if (open && loaded) {
      instanceRef.current?.moveToIdx(initialSlideIdx, true, { duration: 0 });
    }
  }, [open, loaded, instanceRef, initialSlideIdx]);

  useEffect(() => {
    if (open && currentSlide !== initialSlideIdx) {
      setCurrentSlide(initialSlideIdx);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Modal
      open={open}
      slotProps={{
        backdrop: {
          sx: {
            background: 'rgba(21, 36, 59, 0.60)',
            backdropFilter: 'blur(5px)',
          },
          onClick: closeImageViewModal,
          timeout: 300,
        },
      }}
      closeAfterTransition
      sx={{
        display: 'grid',
        placeItems: 'center',
        overflow: 'auto',
      }}
    >
      <Zoom in={open}>
        <Paper
          sx={{
            outline: 'none',
            boxSizing: 'border-box',
            width: '34dvw',
            minWidth: 544,
            aspectRatio: 544 / 712,
            display: 'grid',
            gridTemplateRows: '1fr auto',
            gap: 1.5,
            p: 1.5,
            position: 'relative',
            '& .slider-arrow': {
              position: 'absolute',
              top: '50%',
              color: theme.palette.azure,
              transition: 'opacity 0.3s',
            },
            '& .slider-arrow:disabled': {
              opacity: 0,
            },
            [theme.breakpoints.down('md')]: {
              width: '95dvw',
              minWidth: 300,
            },
          }}
        >
          <Box
            ref={sliderRef}
            className="keen-slider"
            sx={{
              backgroundColor: theme.palette.catskillWhite,
              borderRadius: 1,
            }}
          >
            {mediaList.map(({ mediaUrl = '' }) => (
              <Box
                key={mediaUrl}
                className="keen-slider__slide"
              >
                <Image
                  quality={75}
                  fill
                  loading="lazy"
                  src={mediaUrl}
                  alt=""
                  style={{ objectFit: 'contain', cursor: 'pointer' }}
                />
              </Box>
            ))}
          </Box>
          {loaded && instanceRef.current && (
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
                  left: 2,
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
                  right: 2,
                  transform: 'translateY(-50%)',
                }}
              >
                <ChevronRightRoundedIcon />
              </IconButton>
            </>
          )}
          {FooterComponent?.(mediaList[currentSlide])}
        </Paper>
      </Zoom>
    </Modal>
  );
};
