'use client';

import { Box } from '@mui/material';
import { useSearchParams } from 'next/navigation';

import { FilePreview } from '@shared/components/common/preview/file-preview';

export default function PreviewFile() {
  const searchParams = useSearchParams();

  const url = searchParams.get('url');

  return (
    url && (
      <Box sx={{ width: '100dvw', height: '100dvh' }}>
        <FilePreview url={url} />
      </Box>
    )
  );
}
