import { useAtomValue } from 'jotai';

import { managersLogSettingsApi } from '@features/managers-log-settings/api/managers-log-settings-api';
import { selectedFacilityIdAtom } from '@features/managers-log-settings/states/common';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { useMutation } from '@shared/hooks/api/core/use-mutation';
import { useRevalidate } from '@shared/hooks/api/core/use-revalidate';

export const useMutationUpdateModuleBulk = () => {
  const selectedFacilityId = useAtomValue(selectedFacilityIdAtom);

  const { revalidate } = useRevalidate();

  return useMutation(
    API_CACHE_KEY.UPDATE_MODULE_BULK,
    managersLogSettingsApi.updateModuleBulk,
    {
      onSuccess: () => {
        revalidate([API_CACHE_KEY.GET_MANAGER_LOG_SETTING, selectedFacilityId]);
      },
    },
  );
};
