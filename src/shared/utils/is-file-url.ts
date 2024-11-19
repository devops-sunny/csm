import { isWebURL } from '@shared/utils/is-web-url';

export const isFileUrl = (url: string): boolean => {
  const isValidUrl = isWebURL(url);

  if (!isValidUrl) return false;

  const fileUrlPattern = /\.(\w{1,5})$/i;

  try {
    const urlObj = new URL(url);

    return fileUrlPattern.test(urlObj.pathname);
  } catch {
    return false;
  }
};
