export const ACCEPT_DOCUMENT_TYPES =
  '.doc,.docx,.pdf,.txt,.pptx,.svg,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';

export const ACCEPT_VIDEO_TYPES = '.mp4,.webm,.ogg';

export enum ShiftUpdateKey {
  Open = 'openId',
  Mid = 'midId',
  Close = 'closeId',
}

export const DOCUMENT_FILE_SIZE_LIMIT = 1024 * 25; // 25MB

export const IMAGE_FILE_SIZE_LIMIT = 1024 * 25; // 25MB

export const VIDEO_FILE_SIZE_LIMIT = 1024 * 100; // 100MB

export const CLOUD_SMALL_FILE_LIMIT = 1024 * 100; // 100MB
