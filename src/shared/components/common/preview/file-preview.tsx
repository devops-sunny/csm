import { type FunctionComponent, useEffect, useState, useRef } from 'react';
import { Box, Button, Link, Typography, useTheme } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { v4 as generateId } from 'uuid';

import { LoadingIndicator } from '@shared/components/common/loading-indicator';
import { PreviewLink } from '@shared/components/common/preview/preview-link';

const allowedFileTypes = [
  '.jpeg',
  '.png',
  '.gif',
  '.tiff',
  '.bmp',
  '.webm',
  '.mpeg4',
  '.3gpp',
  '.mov',
  '.avi',
  '.mpegps',
  '.wmv',
  '.flv',
  '.txt',
  '.css',
  '.html',
  '.php',
  '.c',
  '.cpp',
  '.h',
  '.hpp',
  '.js',
  '.doc',
  '.docx',
  '.xls',
  '.xlsx',
  '.ppt',
  '.pptx',
  '.pdf',
  '.pages',
  '.ai',
  '.psd',
  '.tiff',
  '.dxf',
  '.svg',
  '.eps',
  '.ps',
  '.ttf',
  '.xps',
  '.zip',
  '.rar',
];

const allowedWebUrls = ['docs.google.com'];

type FilePreviewProps = {
  url: string;
  readonly?: boolean;
};

export const FilePreview: FunctionComponent<FilePreviewProps> = ({
  url,
  readonly,
}) => {
  const theme = useTheme();

  const { ref: containerRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [iframeUrl, setIframeUrl] = useState('');

  const loadingIndicatorRef = useRef<HTMLDivElement>(null);
  const isLoadedRef = useRef(false);

  const isAllowedFileTypeUrl = allowedFileTypes.some((type) =>
    url.endsWith(type),
  );

  const isAllowedWebUrl = allowedWebUrls.some((allowedUrl) =>
    url.includes(allowedUrl),
  );

  const isUrlValid = isAllowedFileTypeUrl || isAllowedWebUrl;

  useEffect(() => {
    if (!inView || !isAllowedFileTypeUrl) return () => {};

    function getViewerUrl() {
      const { hostname } = new URL(url);

      const urlDomain = hostname.split('.').slice(-2).join('.');

      const path = `/a/${urlDomain}/viewer`;

      const nextViewerURL = new URL(path, 'https://docs.google.com');

      const queryParams = new URLSearchParams({
        url,
        embedded: 'true',
      });

      nextViewerURL.search = queryParams.toString();
      nextViewerURL.hash = generateId();

      return nextViewerURL.toString();
    }

    setIframeUrl(getViewerUrl());

    const retryIntervalId = setInterval(() => {
      if (isLoadedRef.current) {
        clearInterval(retryIntervalId);
      } else {
        setIframeUrl(getViewerUrl());
      }
    }, 2000);

    return () => clearInterval(retryIntervalId);
  }, [url, isAllowedFileTypeUrl, inView, isLoadedRef]);

  const handleIframeLoaded = () => {
    isLoadedRef.current = true;

    const loadingEl = loadingIndicatorRef.current;

    if (loadingEl) {
      loadingEl.style.display = 'none';
    }
  };

  const previewFileUrl = `/preview-file?url=${url}`;

  return (
    <Box
      ref={containerRef}
      sx={{
        width: 1,
        height: 1,
        backgroundColor: isAllowedFileTypeUrl
          ? theme.palette.catskillWhite
          : 'transparent',
        display: 'grid',
        placeItems: 'center',
        position: 'relative',
      }}
    >
      {readonly && (
        <Link
          href={previewFileUrl}
          target="_blank"
          rel="noreferrer"
          sx={{
            backgroundColor: 'transparent',
            position: 'absolute',
            inset: 0,
          }}
        />
      )}
      {!isUrlValid && (
        <Box sx={{ maxWidth: 0.7 }}>
          <Typography
            variant="subtitle1"
            sx={{ opacity: 0.5, textAlign: 'center' }}
          >
            Please provide a valid URL
          </Typography>
        </Box>
      )}
      {isAllowedFileTypeUrl && (
        <>
          <Box
            ref={loadingIndicatorRef}
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundColor: theme.palette.catskillWhite,
              zIndex: 100,
              display: 'block',
            }}
          >
            <LoadingIndicator />
          </Box>
          {isUrlValid && inView && (
            <>
              <Button
                href={previewFileUrl}
                target="_blank"
                sx={{
                  backgroundColor: 'transparent',
                  width: 40,
                  height: 40,
                  minWidth: 0,
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: 0,
                  color: theme.palette.white,
                  ':hover': {
                    backgroundColor: 'transparent',
                  },
                }}
              />
              <iframe
                key={iframeUrl}
                src={iframeUrl}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 0,
                }}
                title="Preview uploaded file"
                sandbox={`allow-same-origin allow-popups ${readonly ? '' : 'allow-scripts'}`}
                onLoad={handleIframeLoaded}
              />
            </>
          )}
        </>
      )}
      {isAllowedWebUrl && <PreviewLink url={url} />}
    </Box>
  );
};
