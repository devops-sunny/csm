import { fetchClient } from '@shared/libs/openapi-typescript-fetch/fetch-client';

export const dashboardApi = {
  getTaggedLogs: fetchClient
    .path('/api/log/managerLog/entry/tagged')
    .method('get')
    .create(),
  getFacilityStatistics: fetchClient
    .path('/api/organization/facility/stats')
    .method('post')
    .create(),
  getFacilityTotal: fetchClient
    .path('/api/organization/facility/total')
    .method('post')
    .create(),
};
