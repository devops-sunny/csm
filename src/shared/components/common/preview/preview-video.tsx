import type { FunctionComponent } from 'react';
import { Typography } from '@mui/material';

export type PreviewVideoProps = {
  userInputUrl: string;
};

export const allowedVideoExtensions = ['.mp4', '.webm', '.ogg'];

export const PreviewVideo: FunctionComponent<PreviewVideoProps> = ({
  userInputUrl,
}) => {
  const userInputUrlLower = userInputUrl.toLowerCase();

  const isSupportedExtension = allowedVideoExtensions.some((ext) =>
    userInputUrlLower.endsWith(ext),
  );

  const isGoogleStorageUrl = userInputUrl.includes(
    'storage.googleapis.com/tbs-dev',
  );

  const isVideoFileUrl = isSupportedExtension || isGoogleStorageUrl;

  if (isVideoFileUrl) {
    return (
      <video
        key={userInputUrl}
        controls
        preload="auto"
        playsInline
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          inset: 0,
        }}
      >
        <source
          src={`${userInputUrlLower}#t=0.01`}
          type="video/mp4"
        />
        <source
          src={`${userInputUrl}#t=0.01`}
          type="video/webm"
        />
        <source
          src={`${userInputUrl}#t=0.01`}
          type="video/ogg"
        />
        Your browser does not support the video tag.
      </video>
    );
  }

  function getEmbeddedUrl(url: string) {
    switch (true) {
      case url.includes('youtube.com') || url.includes('youtu.be'): {
        const { searchParams, pathname } = new URL(
          url.includes('https://') ? url : `https://${url}`,
        );

        const hasVideoIdInSearchParams = searchParams.has('v');

        let videoId = searchParams.get('v');

        if (!hasVideoIdInSearchParams) {
          videoId = pathname.split('/').pop() ?? '';
        }

        return `https://www.youtube.com/embed/${videoId}`;
      }

      case url.includes('vimeo.com'): {
        const videoId = url.split('/').pop();

        return `https://player.vimeo.com/video/${videoId}`;
      }

      default: {
        return null;
      }
    }
  }

  const embeddedUrl = getEmbeddedUrl(userInputUrl);

  if (embeddedUrl) {
    return (
      <iframe
        title="YouTube video player"
        width="100%"
        height="100%"
        style={{
          height: '100%',
          width: '100%',
          position: 'absolute',
          inset: 0,
        }}
        src={embeddedUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        frameBorder={0}
      />
    );
  }

  return (
    <Typography
      sx={{ width: 1, height: 1, display: 'grid', placeItems: 'center' }}
    >
      Sorry, we could not preview this video.
    </Typography>
  );
};
