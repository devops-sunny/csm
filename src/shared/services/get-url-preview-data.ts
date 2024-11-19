import type { PreviewLinkResponse } from 'src/app/api/preview-link/route';

export const getUrlPreviewData = async (
  url: string,
  fetchOptions?: RequestInit,
) => {
  const response = await fetch('/api/preview-link', {
    ...fetchOptions,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  if (response.ok) {
    const previewData = (await response.json()) as PreviewLinkResponse;

    return previewData;
  }

  throw new Error('Failed to get web link preview');
};
