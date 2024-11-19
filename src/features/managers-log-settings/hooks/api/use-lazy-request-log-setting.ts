import { useAtomValue } from 'jotai';

import { managersLogSettingsApi } from '@features/managers-log-settings/api/managers-log-settings-api';
import { MODULE_PER_COLUMN } from '@features/managers-log-settings/constants/common';
import {
  moduleColumnConfigAtom,
  selectedFacilityIdAtom,
  subscriberIdsAtom,
} from '@features/managers-log-settings/states/common';
import type { ModuleColumnConfig } from '@features/managers-log-settings/types/modules';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { useRequest } from '@shared/hooks/api/core/use-request';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const useRequestLogSetting = () => {
  const selectedFacilityId = useAtomValue(selectedFacilityIdAtom);

  const { isLoading: getSettingLoading } = useRequest(
    [API_CACHE_KEY.GET_MANAGER_LOG_SETTING, selectedFacilityId],
    () =>
      managersLogSettingsApi.getSetting({
        facilityId: selectedFacilityId?.toString() ?? '',
      }),
    {
      revalidateOnMount: true,
      skip: !selectedFacilityId,
      onSuccess: (response) => {
        const mewSubscriberIds =
          response.data.subscribers?.map((subscriber) => subscriber.id) ?? [];

        defaultStore.set(subscriberIdsAtom, mewSubscriberIds);

        const sortedModules = response.data.modules.sort(
          (a, b) => a.order - b.order,
        );

        const moduleColumnConfig: ModuleColumnConfig = {
          col1: {
            id: 'col1',
            modules: sortedModules.slice(0, MODULE_PER_COLUMN),
          },
          col2: {
            id: 'col2',
            modules: sortedModules.slice(MODULE_PER_COLUMN),
          },
        };

        defaultStore.set(moduleColumnConfigAtom, moduleColumnConfig);
      },
    },
  );

  return { isLoading: getSettingLoading };
};
