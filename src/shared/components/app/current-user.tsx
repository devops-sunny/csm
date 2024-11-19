import { useState, type FunctionComponent } from 'react';
import {
  Typography,
  Avatar,
  Button,
  Menu,
  useTheme,
  MenuItem,
} from '@mui/material';
import { useRouter } from 'next/navigation';

import LogoutIcon from '@assets/icons/app-side-bar/logout-icon.svg';
import { AppRoute } from '@shared/constants/app-route';
import { clearAuthToken } from '@shared/services/clear-auth-tokens';

type CurrentUserProps = {
  fullName: string;
};

export const CurrentUser: FunctionComponent<CurrentUserProps> = ({
  fullName,
}) => {
  const theme = useTheme();

  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    clearAuthToken();

    router.push(AppRoute.Login);

    handleClose();
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        variant="text"
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography
          fontWeight={500}
          mx={2.25}
          sx={{
            textWrap: 'nowrap',
            [theme.breakpoints.down('md')]: {
              display: 'none',
            },
          }}
        >
          {fullName}
        </Typography>
        <Avatar
          sx={{
            [theme.breakpoints.down('md')]: {
              display: 'none',
            },
          }}
        />
      </Button>
      <Menu
        elevation={0}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{ marginTop: 0.75 }}
      >
        <MenuItem
          onClick={handleLogout}
          sx={{ fontSize: 14, display: 'flex', gap: 1, minWidth: 132 }}
        >
          <LogoutIcon />
          <Typography>Log out</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
