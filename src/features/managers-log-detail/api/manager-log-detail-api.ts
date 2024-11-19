import { fetchClient } from '@shared/libs/openapi-typescript-fetch/fetch-client';

export const managerLogDetailApi = {
  getLogEntries: fetchClient
    .path('/api/log/managerLog/entry')
    .method('get')
    .create(),
  getLogDetail: fetchClient
    .path('/api/log/managerLog/detail/{logId}')
    .method('get')
    .create(),
  addNewLogEntry: fetchClient
    .path('/api/log/managerLog/entry')
    .method('post')
    .create(),
  updateLog: fetchClient.path('/api/log/managerLog/').method('put').create(),
  updateLogEntry: fetchClient
    .path('/api/log/managerLog/entry')
    .method('put')
    .create(),
  deleteLogEntry: fetchClient
    .path('/api/log/managerLog/entry/{entryId}')
    .method('delete')
    .create(),
  updateLogEntryTags: fetchClient
    .path('/api/log/managerLog/tags')
    .method('put')
    .create(),
  getUserList: fetchClient.path('/api/iam/user/list').method('post').create(),
};
