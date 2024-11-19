import { fetchClient } from '@shared/libs/openapi-typescript-fetch/fetch-client';

export const authApi = {
  logIn: fetchClient.path('/api/iam/auth/login').method('post').create(),
  verifyOtp: fetchClient.path('/api/iam/otp/verify').method('post').create(),
  resetPassWord: fetchClient
    .path('/api/iam/auth/reset-password')
    .method('post')
    .create(),
  verifyForgotPassword: fetchClient
    .path('/api/iam/auth/verify-forgot-password')
    .method('post')
    .create(),
  forgotPassword: fetchClient
    .path('/api/iam/auth/forgot-password')
    .method('post')
    .create(),
  sendOtp: fetchClient.path('/api/iam/otp/send').method('post').create(),
};
