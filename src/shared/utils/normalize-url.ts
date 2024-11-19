export const normalizeUrl = (url?: string) => {
  if (!url) return '';

  if (!url.startsWith('http')) {
    return `https://${url}`;
  }

  return url;
};
