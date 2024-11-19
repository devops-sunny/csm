'use client';

import type { FunctionComponent } from 'react';
import { useId } from 'react';
import { Box, Divider, Stack } from '@mui/material';
import type { SxProps } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/system';
import dynamic from 'next/dynamic';

import { LogTypeSelect } from '@features/managers-log-detail/components/common/log-type-select';
import { createEditLogEntryModalAtom } from '@features/managers-log-detail/states/modals-drawers';
import { extractImageURLsFromHtml } from '@features/managers-log-detail/utils/extract-image-urls-from-html';
import { RichTextCustomToolbar } from '@shared/components/common/rich-text-editor/rich-text-custom-toolbar';
import { APP_MOBILE_HEADER_HEIGHT } from '@shared/constants/layout';
import { defaultStore } from '@shared/libs/jotai/default-store';

const RichTextEditor = dynamic(
  () =>
    import('@shared/components/common/rich-text-editor/rich-text-editor').then(
      (module) => module.RichTextEditor,
    ),
  {
    ssr: false,
    loading: () => <Box sx={{ flex: 1 }} />,
  },
);

const HEADER_HEIGHT = '126px';

export type TextAndPictureTypeProps = {
  sx?: SxProps<Theme>;
  readonly?: boolean;
  content?: string;
};

export const TextImageType: FunctionComponent<TextAndPictureTypeProps> = ({
  sx,
  readonly,
  content,
}) => {
  const theme = useTheme();

  const id = useId();

  const handleChange = (htmlString: string) => {
    const createEditLogEntry = defaultStore.get(createEditLogEntryModalAtom);

    const mediaFiles = extractImageURLsFromHtml(htmlString);

    if (createEditLogEntry) {
      defaultStore.set(createEditLogEntryModalAtom, {
        ...createEditLogEntry,
        description: htmlString,
        mediaFiles,
      });
    }
  };

  return (
    <Stack
      direction="column"
      sx={{
        position: 'relative',
        ...sx,
      }}
    >
      <Stack
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{
          display: 'flex',
          position: 'sticky',
          zIndex: 1000,
          top: 0,
          left: 0,
          right: 0,
          alignItems: 'center',
          backgroundColor: theme.palette.catskillWhite,
          flexShrink: 0,
          maxWidth: '100vw',
          boxSizing: 'border-box',
          py: 1,
          ...(readonly && {
            display: 'none',
          }),
          [theme.breakpoints.down('md')]: {
            height: HEADER_HEIGHT,
            position: 'fixed',
            zIndex: 1,
            top: APP_MOBILE_HEADER_HEIGHT,
            right: 0,
            left: 0,
            py: 0,
          },
        }}
      >
        <Box
          sx={{
            px: 3,
            pt: 0,
            boxSizing: 'border-box',
            [theme.breakpoints.down('md')]: {
              px: 2,
              pt: 1.75,
              width: 1,
            },
          }}
        >
          <LogTypeSelect />
        </Box>
        <Divider
          orientation="vertical"
          sx={{
            height: 24,
            ml: 1,
            [theme.breakpoints.down('md')]: {
              display: 'none',
            },
          }}
        />
        <Divider
          orientation="horizontal"
          sx={{
            display: 'none',
            width: '100%',
            mt: 1.75,
            mb: 0.5,
            [theme.breakpoints.down('md')]: {
              display: 'block',
            },
          }}
        />
        <RichTextCustomToolbar id={id} />
        <Divider
          orientation="horizontal"
          sx={{
            display: { xs: 'block', md: 'none' },
            width: '100%',
            mt: 0.5,
          }}
        />
      </Stack>
      <RichTextEditor
        id={id}
        sx={{
          [theme.breakpoints.down('md')]: {
            mt: readonly ? 0 : HEADER_HEIGHT,
            p: 2,
            '& .ql-editor': {
              fontSize: 16,
            },
          },
        }}
        defaultValue={content}
        readonly={readonly}
        onChange={handleChange}
      />
    </Stack>
  );
};
