import toast from 'react-hot-toast';

const validContentTypes = new Set([
  'application/pdf',
  'application/zip',
  'text/plain',
  'application/json',
]);

type DownloadFileFromResponseParams = {
  response: Response;
  fileName: string;
};

const ANCHOR_ID = 'download-file-anchor';

export async function downloadFileFromResponse({
  response,
  fileName,
}: DownloadFileFromResponseParams): Promise<void> {
  const contentType = response.headers.get('Content-Type');

  const hasValidContentType = contentType && validContentTypes.has(contentType);

  if (!hasValidContentType) {
    throw new Error('Response does not contain a valid Content-Type header');
  }

  try {
    const existingDownloadLink = document.querySelector(`#${ANCHOR_ID}`);

    if (existingDownloadLink) {
      existingDownloadLink.remove();
    }

    const blobData = await response.blob();

    const octetStreamBlob = new Blob([blobData], {
      type: 'application/octet-stream',
    });

    const octetStreamUrl = URL.createObjectURL(octetStreamBlob);

    const anchorElement = document.createElement('a');

    anchorElement.setAttribute('href', octetStreamUrl);
    anchorElement.setAttribute('download', fileName);
    anchorElement.setAttribute('id', ANCHOR_ID);

    document.body.append(anchorElement);

    anchorElement.click();

    setTimeout(() => {
      anchorElement.remove();
      window.URL.revokeObjectURL(octetStreamUrl);
    }, 100);
  } catch {
    toast.error('Failed to download file');

    throw new Error('Failed to download file');
  }
}
