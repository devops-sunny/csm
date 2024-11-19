import { useEffect, useState } from 'react';
import { FormControl, FormLabel } from '@mui/material';
import { useParams } from 'next/navigation';

import { useMutateUpdateLog } from '@features/managers-log-detail/hooks/api/use-mutate-update-log';
import { useRequestLogDetail } from '@features/managers-log-detail/hooks/api/use-request-log-detail';
import { AnchorInput } from '@shared/components/common/anchor-input';
import { MobileDrawerSelect } from '@shared/components/common/mobile-drawer-select';
import { Weather } from '@shared/constants/managers-log';

export const MobileWeatherSelect = () => {
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

  return (
    <MobileDrawerSelect
      title="Select Location"
      options={[
        { value: Weather.FullSun, label: 'Full Sun' },
        { value: Weather.ModerateCloudy, label: 'Moderate Cloudy' },
        { value: Weather.Rain, label: 'Rain' },
        { value: Weather.Snow, label: 'Snow' },
      ]}
      value={weather ?? ''}
      onChange={(newValue) => {
        handleChangeWeather(newValue as Weather);
      }}
      TriggerComponent={({ onOpen, selectedOption }) => (
        <FormControl
          fullWidth
          disabled={updateLogLoading || getLogDetailLoading}
        >
          <FormLabel>Weather</FormLabel>
          <AnchorInput
            placeholder="How is the weather?"
            onClick={onOpen}
            value={selectedOption?.label ?? ''}
            disabled={updateLogLoading || getLogDetailLoading}
          />
        </FormControl>
      )}
    />
  );
};
