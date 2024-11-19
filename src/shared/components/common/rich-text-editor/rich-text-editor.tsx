'use client';

import type { FunctionComponent } from 'react';
import { useMemo, useState } from 'react';
import type { SxProps } from '@mui/material';
import { Stack, useTheme } from '@mui/material';
import type { Theme } from '@mui/system';
import ImageResize from 'quill-image-resize-module-react';
import ImageUploader from 'quill-image-uploader';
import ReactQuill, { Quill } from 'react-quill';

import { poppinsFont } from '@shared/constants/app-font';
import { useIsMobile } from '@shared/hooks/common/use-is-mobile';
import { MobileResize } from '@shared/libs/quill/mobile-resizer-module';
import { uploadFile } from '@shared/services/upload-file';
import { UploadFileType } from '@shared/types/common';

import 'quill-image-uploader/dist/quill.imageUploader.min.css';
import 'react-quill/dist/quill.snow.css';

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageUploader', ImageUploader);

export type RichTextEditorProps = {
  id: string;
  sx?: SxProps<Theme>;
  value?: string;
  defaultValue?: string;
  readonly?: boolean;
  onChange?: (htmlString: string) => void;
};

export const RichTextEditor: FunctionComponent<RichTextEditorProps> = ({
  id,
  sx,
  value,
  defaultValue,
  readonly,
  onChange,
}) => {
  const theme = useTheme();

  const isMobile = useIsMobile();

  const [content, setContent] = useState(value ?? defaultValue);

  const handleChange = (newHtmlString: string) => {
    setContent(newHtmlString);

    const htmlObject = new DOMParser().parseFromString(
      newHtmlString,
      'text/html',
    );

    const isEmpty =
      !htmlObject.body.textContent?.trim() &&
      !htmlObject.body.querySelectorAll('img').length;

    if (isEmpty) {
      onChange?.('');
    } else {
      onChange?.(newHtmlString);
    }
  };

  const modules = useMemo(
    () => ({
      imageUploader: {
        upload: async (file: File) => {
          const url = await uploadFile(file, UploadFileType.Log);

          return url;
        },
      },
      toolbar: {
        container: `[id="${id}"]`,
      },
      clipboard: {
        matchVisual: false,
      },
      ...(!readonly && {
        imageResize: {
          parchment: Quill.import('parchment'),
          modules: [isMobile ? MobileResize : 'Resize', 'DisplaySize'],
          handleStyles: {
            backgroundColor: theme.palette.azure,
            color: theme.palette.catskillWhite,
          },
        },
      }),
    }),
    [id],
  );

  return (
    <Stack
      id="richtext-editor-container"
      direction="column"
      sx={{
        maxWidth: '100vw',
        flexGrow: 1,
        boxSizing: 'border-box',
        '& .ql-container.ql-snow': {
          border: 'none !important',
        },
        '& .ql-editor': {
          p: readonly ? 0 : 3,
          flexGrow: 1,
          fontSize: 13,
        },
        '& .ql-container': {
          flexGrow: 1,
          background: 'white',
          display: 'flex',
          flexDirection: 'column',
          ...poppinsFont.style,
        },
        '& .ql-tooltip[data-mode="link"]': {
          zIndex: 9999,
          left: '50% !important',
          transform: 'translateX(-50%) !important',
        },
        ...sx,
      }}
    >
      <ReactQuill
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
        readOnly={readonly}
        theme="snow"
        value={content}
        onChange={handleChange}
        modules={modules}
        bounds="#richtext-editor-container"
      />
    </Stack>
  );
};
