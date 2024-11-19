import { LogEntryType } from '@shared/types/api/generated';

export const getDisplayAllowedType = (allowedTypes: LogEntryType) => {
  switch (allowedTypes) {
    case LogEntryType.TextImage: {
      return 'Text & Image';
    }

    case LogEntryType.Album: {
      return 'Album';
    }

    case LogEntryType.Document: {
      return 'Document';
    }

    case LogEntryType.Link: {
      return 'Link';
    }

    case LogEntryType.Video: {
      return 'Video';
    }

    default: {
      return '';
    }
  }
};
