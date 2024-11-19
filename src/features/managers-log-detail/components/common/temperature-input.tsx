import { FormControl, FormLabel, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useParams } from 'next/navigation';

import { useMutateUpdateLog } from '@features/managers-log-detail/hooks/api/use-mutate-update-log';
import { useRequestLogDetail } from '@features/managers-log-detail/hooks/api/use-request-log-detail';
import { useDebounce } from '@shared/hooks/common/use-debounce';

export const TemperatureInput = () => {
  const params = useParams();

  const logId = params.logId as string;

  const debounce = useDebounce();

  const theme = useTheme();

  const { data: getLogDetailResponse, isLoading: getLogDetailLoading } =
    useRequestLogDetail();

  const { trigger: updateLog, isMutating: updateLogLoading } =
    useMutateUpdateLog();

  const logDetail = getLogDetailResponse?.data;

  return (
    <FormControl
      disabled={updateLogLoading || getLogDetailLoading}
      sx={{
        width: 46,
        flexShrink: 0,
        [theme.breakpoints.down('md')]: { width: 72 },
      }}
    >
      <FormLabel sx={{ whiteSpace: 'nowrap' }}>Avg Temp</FormLabel>
      <TextField
        defaultValue={logDetail?.temprature}
        placeholder="-"
        type="number"
        InputProps={{ inputProps: { min: -100, max: 100 } }}
        onChange={({ target: { value } }) => {
          debounce(() => {
            updateLog({
              logId: Number(logId),
              temprature: Number(value),
            });
          }, 500);
        }}
      />
    </FormControl>
  );
};
