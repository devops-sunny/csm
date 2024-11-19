import { fetchClient } from '@shared/libs/openapi-typescript-fetch/fetch-client';

export const EmployeeListingApi = {
  getEmployee: fetchClient.path('/api/users/list').method('post').create(),
  addNewLog: fetchClient.path('/api/log/managerLog/').method('post').create(),
  deleteLog: fetchClient
    .path('/api/log/managerLog/{logId}')
    .method('delete')
    .create(),
};
