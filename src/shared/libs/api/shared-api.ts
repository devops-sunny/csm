import { fetchClient } from '@shared/libs/openapi-typescript-fetch/fetch-client';

export const sharedApi = {
  getOrganizationFacilities: fetchClient
    .path('/api/organization/facility')
    .method('get')
    .create(),
  getOrganizationFacilitiesDeparment: fetchClient
    .path('/api/organization/facility/department')
    .method('post')
    .create(),
  getUserList: fetchClient.path('/api/iam/user/list').method('post').create(),
  getSelfProfile: fetchClient
    .path('/api/iam/user/profile')
    .method('get')
    .create(),
};
