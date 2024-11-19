import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { useRequest } from '@shared/hooks/api/core/use-request';
import { sharedApi } from '@shared/libs/api/shared-api';

export const useRequestAllFacility = () =>
  useRequest([API_CACHE_KEY.GET_ORGANIZATION_FACILITIES], () =>
    sharedApi.getOrganizationFacilities({}),
  );
