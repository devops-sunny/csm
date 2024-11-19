import { useEffect, useState } from 'react';
import type { SelectChangeEvent } from '@mui/material';
import {
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { useParams } from 'next/navigation';

import { useMutateUpdateLog } from '@features/managers-log-detail/hooks/api/use-mutate-update-log';
import { useRequestLogDetail } from '@features/managers-log-detail/hooks/api/use-request-log-detail';
import { RenderWeatherIcon } from '@shared/components/common/render-weather-icon';
import { Weather } from '@shared/constants/managers-log';

export const WeatherSelect = () => {
  const [weather, setWeather] = useState<Weather>();

  const params = useParams();

  const logId = params.logId as string;

  const { data: getLogDetailResponse, isLoading: getLogDetailLoading } =
    useRequestLogDetail();

  const { trigger: updateLog, isMutating: updateLogLoading } =
    useMutateUpdateLog();

  const logDetail = getLogDetailResponse?.data;

  useEffect(() => {
    setWeather(logDetail?.weather as Weather);
  }, [logDetail]);

  const handleChangeWeather = (value: Weather) => {
    updateLog({
      logId: Number(logId),
      weather: value,
    });

    setWeather(value);
  };

  const weatherLabels = {
    [Weather.FullSun]: 'Full Sun',
    [Weather.ModerateCloudy]: 'Moderate Cloudy',
    [Weather.Rain]: 'Rain',
    [Weather.Snow]: 'Snow',
  };

  return (
    <FormControl
      fullWidth
      disabled={updateLogLoading || getLogDetailLoading}
    >
      <FormLabel>Weather</FormLabel>
      <Select
        defaultValue="none"
        value={weather ?? 'none'}
        renderValue={(value) => (
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
          >
            {weather && <RenderWeatherIcon weather={weather} />}
            <Typography>{weatherLabels[value as Weather]}</Typography>
          </Stack>
        )}
        onChange={(event: SelectChangeEvent) => {
          handleChangeWeather(event.target.value as Weather);
        }}
      >
        <MenuItem
          disabled
          value="none"
        >
          How is the weather?
        </MenuItem>
        <MenuItem value={Weather.FullSun}>Full Sun</MenuItem>
        <MenuItem value={Weather.ModerateCloudy}>Moderate Cloudy</MenuItem>
        <MenuItem value={Weather.Rain}>Rain</MenuItem>
        <MenuItem value={Weather.Snow}>Snow</MenuItem>
      </Select>
    </FormControl>
  );
};
