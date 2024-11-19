import { Divider, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useParams } from 'next/navigation';

import { MobileShiftsSettingFields } from '@features/managers-log-detail/components/common/mobile-shifts-setting-fields';
import { MobileWeatherSelect } from '@features/managers-log-detail/components/common/mobile-weather-select';
import { ShiftsSettingFields } from '@features/managers-log-detail/components/common/shifts-setting-fields';
import { TemperatureInput } from '@features/managers-log-detail/components/common/temperature-input';
import { WeatherSelect } from '@features/managers-log-detail/components/common/weather-select';
import { SETTING_FIELDS_HEIGHT } from '@features/managers-log-detail/constants/layout';
import { useIsMobile } from '@shared/hooks/common/use-is-mobile';

export const SettingFields = () => {
  const theme = useTheme();

  const isMobile = useIsMobile();

  const params = useParams();

  const logId = params.logId as string;

  if (!logId) {
    return null;
  }

  return (
    <Paper
      variant="sharp-edged"
      sx={{
        py: 1.25,
        height: SETTING_FIELDS_HEIGHT,
        boxSizing: 'border-box',
        display: 'grid',
        alignItems: 'center',
        gridTemplateColumns: '1fr 12px 1fr 1fr 1fr',
        gap: 1.5,
        px: 3,
        [theme.breakpoints.down('md')]: {
          height: 1,
          gridTemplateColumns: '1fr',
          gridTemplateRows: '1fr',
          backgroundColor: 'transparent',
          boxShadow: 'none',
          px: 2.75,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: 1,
          gap: 1.5,
          [theme.breakpoints.down('md')]: {
            gap: 2.5,
          },
        }}
      >
        {isMobile ? <MobileWeatherSelect /> : <WeatherSelect />}
        <TemperatureInput />
      </Box>
      <Divider
        orientation="vertical"
        sx={{
          mx: 'auto',
          width: '1px',
          height: 54,
          [theme.breakpoints.down('md')]: {
            display: 'none',
          },
        }}
      />
      {isMobile ? <MobileShiftsSettingFields /> : <ShiftsSettingFields />}
    </Paper>
  );
};
