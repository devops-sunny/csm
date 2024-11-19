import { fetchClient } from '@shared/libs/openapi-typescript-fetch/fetch-client';

export const managersLogSettingsApi = {
  getSetting: fetchClient
    .path('/api/log/managerLogSetting')
    .method('get')
    .create(),
  getUserList: fetchClient.path('/api/iam/user/list').method('post').create(),
  addNewModule: fetchClient
    .path('/api/log/managerLogSetting/module')
    .method('post')
    .create(),
  updateModule: fetchClient
    .path('/api/log/managerLogSetting/module/{moduleId}')
    .method('put')
    .create(),
  updateModuleBulk: fetchClient
    .path('/api/log/managerLogSetting/module/bulk')
    .method('put')
    .create(),
  updateSetting: fetchClient
    .path('/api/log/managerLogSetting/module/{moduleId}')
    .method('put')
    .create(),
  updateSubscribers: fetchClient
    .path('/api/log/managerLogSetting/subscribers')
    .method('put')
    .create(),
  deleteModule: fetchClient
    .path('/api/log/managerLogSetting/module/{moduleId}')
    .method('delete')
    .create(),
  loadModuleFromDifferentFacility: fetchClient
    .path('/api/log/managerLogSetting/load')
    .method('post')
    .create(),
};
