import type { FunctionComponent } from 'react';
import React, { useState } from 'react';
import type { ImageProps } from 'next/image';
import Image from 'next/image';

export type ImageWithFallbackProps = ImageProps & {
  fallBackImage: string;
};

export const ImageWithFallback: FunctionComponent<ImageWithFallbackProps> = (
  props,
) => {
  const [hasError, setHasError] = useState(false);

  const { fallBackImage, src, ...restProps } = props;

  return (
    <Image
      {...restProps}
      alt={restProps.alt || 'Image'}
      src={hasError ? fallBackImage : src || fallBackImage}
      onError={() => setHasError(true)}
      loading="lazy"
      placeholder="blur"
      blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
    />
  );
};
