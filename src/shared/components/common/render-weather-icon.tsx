import type { FunctionComponent } from 'react';
import { SvgIcon, Typography } from '@mui/material';
import type { SxProps } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/system';

import WeatherCloudyIcon from '@assets/icons/common/weather-cloudy.svg';
import WeatherRainIcon from '@assets/icons/common/weather-rain.svg';
import WeatherSnowIcon from '@assets/icons/common/weather-snow.svg';
import WeatherSunIcon from '@assets/icons/common/weather-sun.svg';
import { Weather } from '@shared/constants/managers-log';

export type RenderWeatherIconProps = {
  sx?: SxProps<Theme>;
  weather: Weather;
};

export const RenderWeatherIcon: FunctionComponent<RenderWeatherIconProps> = ({
  sx,
  weather,
}) => {
  const theme = useTheme();

  switch (weather) {
    case Weather.FullSun: {
      return (
        <SvgIcon sx={{ color: theme.palette.azure, ...sx }}>
          <WeatherSunIcon />
        </SvgIcon>
      );
    }

    case Weather.ModerateCloudy: {
      return (
        <SvgIcon sx={{ color: theme.palette.azure, ...sx }}>
          <WeatherCloudyIcon />
        </SvgIcon>
      );
    }

    case Weather.Rain: {
      return (
        <SvgIcon sx={{ color: theme.palette.azure, ...sx }}>
          <WeatherRainIcon />
        </SvgIcon>
      );
    }

    case Weather.Snow: {
      return (
        <SvgIcon sx={{ color: theme.palette.azure, ...sx }}>
          <WeatherSnowIcon />
        </SvgIcon>
      );
    }

    default: {
      return (
        <Typography
          textAlign="center"
          sx={sx}
        >
          —
        </Typography>
      );
    }
  }
};
