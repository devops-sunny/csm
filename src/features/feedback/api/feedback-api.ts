import { fetchClient } from '@shared/libs/openapi-typescript-fetch/fetch-client';

export const feedbackApi = {
  getFeedbacks: fetchClient
    .path('/api/organization/feedback/list')
    .method('post')
    .create(),
  createFeedback: fetchClient
    .path('/api/organization/feedback')
    .method('post')
    .create(),
  updateFeedback: fetchClient
    .path('/api/organization/feedback/{id}')
    .method('put')
    .create(),
  deleteFeedback: fetchClient
    .path('/api/organization/feedback/{id}')
    .method('delete')
    .create(),
};
