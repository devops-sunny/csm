'use client';

import type { FunctionComponent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Box, IconButton, Popper, Stack, useTheme } from '@mui/material';
import { useOnClickOutside, useWindowSize } from 'usehooks-ts';

import ThreeDotsIcon from '@assets/icons/common/3-dots.svg';
import { toolbarButtons } from '@shared/components/common/rich-text-editor/toolbar-buttons';

const BUTTON_SPACING = 1.25;
const HEADER_SELECT_WIDTH_PX = 98;
const BUTTON_WIDTH_PX = 28;
const THREE_DOT_OFFSET_PX = 6;

export type RichTextCustomToolbarProps = {
  id: string;
};

export const RichTextCustomToolbar: FunctionComponent<
  RichTextCustomToolbarProps
> = ({ id }) => {
  useWindowSize(); // To force re-render when window size changes

  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);

  const popperRootRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(popperRootRef, () => setAnchorEl(null));

  const maximumVisibleButton = (() => {
    if (!containerEl) return toolbarButtons.length;

    const containerStyles = getComputedStyle(containerEl);

    const containerPaddingX =
      Number.parseFloat(containerStyles.paddingLeft) +
      Number.parseFloat(containerStyles.paddingRight);

    const containerWidth = containerEl.clientWidth - containerPaddingX;

    const buttonGap = Number.parseInt(theme.spacing(BUTTON_SPACING), 10);

    const buttonSize = BUTTON_WIDTH_PX + buttonGap;

    const threeDotArea = buttonSize + THREE_DOT_OFFSET_PX;

    const buttonContainerWidth =
      containerWidth - HEADER_SELECT_WIDTH_PX - threeDotArea;

    return Math.round(buttonContainerWidth / buttonSize);
  })();

  const totalButtonElements = toolbarButtons.length;

  const hasHiddenButton = totalButtonElements > maximumVisibleButton;

  useEffect(() => {
    if (maximumVisibleButton >= totalButtonElements) {
      setAnchorEl(null);
    }
  }, [maximumVisibleButton, totalButtonElements]);

  const visibleButtonElements = toolbarButtons.map((element, index) => (
    <Box
      key={element.key}
      sx={{
        display: index < maximumVisibleButton ? 'block' : 'none',
      }}
    >
      {element}
    </Box>
  ));

  const hiddenButtonElements = toolbarButtons.map((element, index) => (
    <Box
      key={element.key}
      sx={{
        display: index >= maximumVisibleButton ? 'block' : 'none',
      }}
    >
      {element}
    </Box>
  ));

  return (
    <Box sx={{ position: 'relative', width: 1, height: 40 }}>
      <Stack
        id={id}
        direction="row"
        ref={(el) => setContainerEl(el)}
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          alignItems: 'center',
          px: `${theme.spacing(3)} !important`,
          border: 'none !important',
          py: 1.5,
          maxWidth: '100%',
          boxSizing: 'border-box',
          justifyContent: 'space-between',
          [theme.breakpoints.down('md')]: {
            px: `${theme.spacing(1)} !important`,
          },
        }}
      >
        <Box sx={{ width: 98, flexShrink: 0 }}>
          <select
            className="ql-header"
            defaultValue=""
            onChange={(e) => e.persist()}
            aria-label="Select header"
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              appearance: 'none',
              MozAppearance: 'none',
              WebkitAppearance: 'none',
            }}
          >
            {[1, 2, 3, 4].map((value) => (
              <option
                key={value}
                value={value}
                aria-label={`Header ${value}`}
              />
            ))}
            <option
              value=""
              aria-label="Option Normal"
            />
          </select>
        </Box>
        <Stack
          direction="row"
          spacing={BUTTON_SPACING}
          sx={{
            flexGrow: 1,
            overflow: 'hidden',
          }}
        >
          {visibleButtonElements}
        </Stack>
        <IconButton
          size="thin"
          onClick={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)}
          sx={{
            color: theme.palette.azure,
            display: `${hasHiddenButton ? 'inline-flex' : 'none'} !important`,
            justifyContent: 'center',
            fontSize: 16,
          }}
        >
          <ThreeDotsIcon />
        </IconButton>
        <Popper
          ref={popperRootRef}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          disablePortal
          keepMounted
          sx={{
            zIndex: 9999,
          }}
        >
          <Stack
            direction="row"
            spacing={BUTTON_SPACING}
            flexWrap="wrap"
            sx={{
              p: 1,
              backgroundColor: theme.palette.white,
              borderRadius: 2,
              mr: 2,
              mt: 0.5,
              maxWidth: '90vw',
              boxShadow: theme.shadows[16],

              '& *': {
                float: 'none !important',
              },
            }}
          >
            {hiddenButtonElements}
          </Stack>
        </Popper>
      </Stack>
    </Box>
  );
};
