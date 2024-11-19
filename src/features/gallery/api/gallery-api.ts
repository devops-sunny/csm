import { fetchClient } from '@shared/libs/openapi-typescript-fetch/fetch-client';

export const galleryApi = {
  getMediaList: fetchClient.path('/api/log/media/list').method('post').create(),
  deleteMedia: fetchClient.path('/api/log/media').method('delete').create(),
  getMediaComments: fetchClient
    .path('/api/log/mediaComments/list')
    .method('post')
    .create(),
  createMediaComment: fetchClient
    .path('/api/log/mediaComments')
    .method('post')
    .create(),
  deleteMediaComment: fetchClient
    .path('/api/log/mediaComments/{id}')
    .method('delete')
    .create(),
  createMedia: fetchClient.path('/api/log/media').method('post').create(),
};
