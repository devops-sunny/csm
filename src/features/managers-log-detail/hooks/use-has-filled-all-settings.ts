import { useRequestLogDetail } from '@features/managers-log-detail/hooks/api/use-request-log-detail';

export const useHasFilledAllSettings = () => {
  const { data: getLogDetailResponse } = useRequestLogDetail();

  const hasFilled =
    getLogDetailResponse?.data &&
    getLogDetailResponse.data.weather &&
    getLogDetailResponse.data.temprature &&
    getLogDetailResponse.data.open &&
    getLogDetailResponse.data.open.length > 0 &&
    getLogDetailResponse.data.mid &&
    getLogDetailResponse.data.mid.length > 0 &&
    getLogDetailResponse.data.close &&
    getLogDetailResponse.data.close.length > 0;

  return Boolean(hasFilled);
};
