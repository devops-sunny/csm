import { fetchClient } from '@shared/libs/openapi-typescript-fetch/fetch-client';

export const managerLogListingApi = {
  getLogs: fetchClient.path('/api/log/managerLog/list').method('post').create(),
  addNewLog: fetchClient.path('/api/log/managerLog/').method('post').create(),
  deleteLog: fetchClient
    .path('/api/log/managerLog/{logId}')
    .method('delete')
    .create(),
};
