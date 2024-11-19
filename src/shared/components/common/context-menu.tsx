'use client';

import type { FunctionComponent, ReactNode, SyntheticEvent } from 'react';
import { useState } from 'react';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

import ThreeDotsIcon from '@assets/icons/common/3-dots.svg';

type ControlledProps = Partial<{
  AnchorComponent: JSX.Element;
  open: boolean;
  onClose: () => void;
}>;

export type MenuItemConfig = {
  label: ReactNode;
  onClick: () => void;
  hidden?: boolean;
  disabled?: boolean;
};

export type ContextMenuProps = {
  sx?: SxProps<Theme>;
  className?: string;
  menuItems: MenuItemConfig[];
  disablePortal?: boolean;
} & ControlledProps;

export const ContextMenu: FunctionComponent<ContextMenuProps> = ({
  sx,
  menuItems,
  disablePortal = true,
  className,
  AnchorComponent,
  open,
  onClose,
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: SyntheticEvent) => {
    event.stopPropagation();

    setAnchorEl(null);

    onClose?.();
  };

  const shouldOpen = open ?? Boolean(anchorEl);

  return (
    <>
      {AnchorComponent && (
        <Box
          onClick={handleClick}
          ref={(node: HTMLElement) => setAnchorEl(node)}
          sx={[...(Array.isArray(sx) ? sx : [sx])]}
        >
          {AnchorComponent}
        </Box>
      )}
      {!AnchorComponent && (
        <IconButton
          size="thin"
          onClick={handleClick}
          className={className}
          sx={{
            ...sx,
            color: theme.palette.azure,
            height: 21,
            width: 8.25,
            fontSize: 16,
            ...(shouldOpen && {
              backgroundColor: theme.palette.blueberry,
              color: theme.palette.white,
            }),
          }}
        >
          <ThreeDotsIcon />
        </IconButton>
      )}
      <Menu
        disablePortal={disablePortal}
        anchorEl={anchorEl}
        open={shouldOpen}
        onClose={handleClose}
      >
        {menuItems.map(
          ({ label, hidden, disabled, onClick: onItemClick }) =>
            !hidden && (
              <MenuItem
                disabled={disabled}
                key={String(label)}
                onClick={(event) => {
                  handleClose(event);
                  onItemClick();
                }}
              >
                {label}
              </MenuItem>
            ),
        )}
      </Menu>
    </>
  );
};
