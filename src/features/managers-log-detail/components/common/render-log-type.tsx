import type { FunctionComponent } from 'react';

import { AlbumType } from '@features/managers-log-detail/components/log-content/album-type';
import { DocumentType } from '@features/managers-log-detail/components/log-content/document-type';
import { LinkType } from '@features/managers-log-detail/components/log-content/link-type';
import { TextImageType } from '@features/managers-log-detail/components/log-content/text-image-type';
import { VideoType } from '@features/managers-log-detail/components/log-content/video-type';
import { LogEntryType } from '@shared/types/api/generated';
import type { ApiType } from '@shared/types/utils/api';
import { getNormalizeFullName } from '@shared/utils/get-normalize-full-name';

export type RenderLogTypeProps = {
  readonly?: boolean;
  logEntry?: ApiType['ManagerLogEntry'] | null;
  logType?: LogEntryType | null;
};

export const RenderLogType: FunctionComponent<RenderLogTypeProps> = ({
  readonly,
  logEntry,
  logType,
}) => {
  if (!logEntry) return null;

  const { user, mediaFiles, description } = logEntry;

  switch (logType) {
    case LogEntryType.TextImage: {
      return (
        <TextImageType
          readonly={readonly}
          content={description}
        />
      );
    }

    case LogEntryType.Album: {
      return (
        <AlbumType
          readonly={readonly}
          mediaFiles={mediaFiles}
          userName={getNormalizeFullName(user?.firstName, user?.lastName)}
        />
      );
    }

    case LogEntryType.Video: {
      return (
        <VideoType
          readonly={readonly}
          videoUrl={mediaFiles?.[0]}
        />
      );
    }

    case LogEntryType.Document: {
      return (
        <DocumentType
          readonly={readonly}
          documentFile={mediaFiles?.[0]}
        />
      );
    }

    case LogEntryType.Link: {
      return (
        <LinkType
          readonly={readonly}
          link={mediaFiles?.[0]}
        />
      );
    }

    default: {
      return null;
    }
  }
};
