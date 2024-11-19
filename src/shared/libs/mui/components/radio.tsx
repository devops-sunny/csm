import type { Components, Theme } from '@mui/material';
import { Box } from '@mui/material';

export const MuiRadio: Components<Theme>['MuiRadio'] = {
  defaultProps: {
    disableRipple: true,
    icon: (
      <Box
        sx={{
          height: 18,
          width: 18,
          border: '1px solid',
          borderColor: (theme) => theme.palette.blueHaze,
          backgroundColor: (theme) => theme.palette.white,
          borderRadius: 50,
        }}
      />
    ),
    checkedIcon: (
      <Box
        sx={{
          height: 18,
          width: 18,
          borderRadius: 50,
          border: '1px solid',
          borderColor: (theme) => theme.palette.blueHaze,
          backgroundColor: (theme) => theme.palette.white,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: 50,
            backgroundColor: (theme) => theme.palette.blueberry,
          }}
        />
      </Box>
    ),
  },
  styleOverrides: {
    root: ({ theme }) => ({
      '&:hover .MuiBox-root': {
        borderColor: theme.palette.blueberry,
      },
      '&.Mui-checked:hover .MuiBox-root': {
        color: theme.palette.blueberry,
      },
      '&.Mui-disabled .MuiBox-root': {
        backgroundColor: theme.palette.blueHaze,
        opacity: 0.5,
      },
    }),
  },
};
