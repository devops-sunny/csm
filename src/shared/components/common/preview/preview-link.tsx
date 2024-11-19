// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @next/next/no-img-element -- Due o unknown image resource */

import { useState, type FunctionComponent, useEffect } from 'react';
import { Box, Link, Paper, Typography, useTheme } from '@mui/material';
import { useDebounceCallback } from 'usehooks-ts';

import { LoadingIndicator } from '@shared/components/common/loading-indicator';
import { getUrlPreviewData } from '@shared/services/get-url-preview-data';
import { isWebURL } from '@shared/utils/is-web-url';
import type { PreviewLinkResponse } from 'src/app/api/preview-link/route';

type PreviewLinkProps = {
  url: string;
  debounceTime?: number;
};

export const PreviewLink: FunctionComponent<PreviewLinkProps> = ({
  url,
  debounceTime = 500,
}) => {
  const theme = useTheme();

  const isValidUrl = isWebURL(url);

  const [previewData, setPreviewData] = useState<PreviewLinkResponse>();
  const [currentDebounceTime, setCurrentDebounceTime] = useState(0);

  const [container, setContainer] = useState<HTMLAnchorElement | null>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const debouncedUpdatePreviewSrc = useDebounceCallback(
    async (value: string) => {
      try {
        if (!loading) setLoading(true);

        if (error) setError(false);

        const nextPreviewData = await getUrlPreviewData(value);

        setPreviewData(nextPreviewData);
      } catch {
        setPreviewData(undefined);
        setError(true);
      } finally {
        setLoading(false);
        setCurrentDebounceTime(debounceTime);
      }
    },
    currentDebounceTime,
  );

  useEffect(() => {
    if (isValidUrl && url) {
      debouncedUpdatePreviewSrc(url);
    }

    return () => debouncedUpdatePreviewSrc.cancel();

    /* eslint-disable-next-line react-hooks/exhaustive-deps --
      Intentionally ignore debouncedUpdatePreviewSrc 
      because its depend on loading state 
      so can cause infinite loop that hit the server */
  }, [url]);

  const containerWidth = container
    ? Number.parseFloat(getComputedStyle(container).width)
    : 0;

  const shouldShowPreview =
    isValidUrl && containerWidth > 0 && !loading && previewData;

  if (!isValidUrl) {
    return (
      <Box
        sx={{
          width: 1,
          height: 1,
          display: 'grid',
          placeItems: 'center',
          backgroundColor: theme.palette.catskillWhite,
        }}
      >
        <Typography variant="body2">Please enter a valid URL</Typography>
      </Box>
    );
  }

  return (
    <Link
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      underline="none"
      ref={setContainer}
      sx={{
        position: 'relative',
        aspectRatio: 3 / 2,
        width: 1,
        height: 'auto',
        display: 'grid',
        placeItems: 'center',
        borderRadius: 1.5,
        backgroundColor: theme.palette.catskillWhite,
      }}
    >
      {error && (
        <Typography variant="body2">Cannot load preview of the url</Typography>
      )}
      {loading && <LoadingIndicator />}
      {shouldShowPreview && (
        <Paper
          sx={{
            width: 1,
            height: 1,
            background: theme.palette.catskillWhite,
            display: 'grid',
            gridTemplateRows: '1fr auto',
            boxShadow: theme.shadows[0],
          }}
        >
          <Box
            sx={{
              height: 'auto',
              width: 1,
              display: 'grid',
              placeItems: 'center',
            }}
          >
            {previewData.image ? (
              <img
                alt=""
                src={previewData.image}
                style={{ maxWidth: '100%', justifySelf: 'center' }}
                loading="lazy"
              />
            ) : (
              <Typography
                variant="button"
                sx={{ opacity: 0.5 }}
              >
                Preview image is unavailable
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              backgroundColor: theme.palette.white,
              pt: 2,
            }}
          >
            <Typography variant="caption">{previewData.hostname}</Typography>
            <Typography
              sx={{ maxWidth: containerWidth }}
              variant="body2"
              noWrap
            >
              {previewData.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                color: theme.palette.text.secondary,
                maxWidth: containerWidth,
                overflow: 'clip',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {previewData.description}
            </Typography>
          </Box>
        </Paper>
      )}
    </Link>
  );
};
