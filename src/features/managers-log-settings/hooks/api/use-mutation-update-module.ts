import { useAtomValue } from 'jotai';

import { managersLogSettingsApi } from '@features/managers-log-settings/api/managers-log-settings-api';
import {
  addEditModuleAtom,
  mobileAddEditModuleAtom,
  selectedFacilityIdAtom,
} from '@features/managers-log-settings/states/common';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { useMutation } from '@shared/hooks/api/core/use-mutation';
import { useRevalidate } from '@shared/hooks/api/core/use-revalidate';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const useMutationUpdateModule = () => {
  const { revalidate } = useRevalidate();

  const selectedFacilityId = useAtomValue(selectedFacilityIdAtom);

  return useMutation(
    API_CACHE_KEY.ADD_NEW_SETTING_MODULE,
    managersLogSettingsApi.updateModule,
    {
      onSuccess: () => {
        defaultStore.set(addEditModuleAtom, null);
        defaultStore.set(mobileAddEditModuleAtom, null);

        revalidate([API_CACHE_KEY.GET_MANAGER_LOG_SETTING, selectedFacilityId]);
      },
    },
  );
};
