import { useState, type FunctionComponent } from 'react';
import { Box, Divider, FormControl, Stack, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { LogTypeSelect } from '@features/managers-log-detail/components/common/log-type-select';
import { URL_REGEX } from '@features/managers-log-detail/constants/regex';
import { createEditLogEntryModalAtom } from '@features/managers-log-detail/states/modals-drawers';
import { PreviewLink } from '@shared/components/common/preview/preview-link';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { normalizeUrl } from '@shared/utils/normalize-url';

export type LinkTypeProps = {
  readonly?: boolean;
  link?: string;
};

export const LinkType: FunctionComponent<LinkTypeProps> = ({
  readonly,
  link,
}) => {
  const theme = useTheme();

  const [previewUrl, setPreviewUrl] = useState(link ?? '');

  const normalizedPreviewUrl = normalizeUrl(previewUrl);

  const isValidUrl = URL_REGEX.test(normalizedPreviewUrl);

  const handleChange = (value: string) => {
    const createEditLogEntry = defaultStore.get(createEditLogEntryModalAtom);

    if (createEditLogEntry) {
      defaultStore.set(createEditLogEntryModalAtom, {
        ...createEditLogEntry,
        mediaFiles: [value],
      });
    }

    setPreviewUrl(value);
  };

  return (
    <Box
      sx={{
        width: 1,
        backgroundColor: theme.palette.white,
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        [theme.breakpoints.down('md')]: {
          minWidth: 0,
        },
      }}
    >
      <Stack
        spacing={1.75}
        divider={
          <>
            <Divider
              orientation="horizontal"
              sx={{
                width: 1,
                display: 'none',
                [theme.breakpoints.down('md')]: {
                  display: 'block',
                },
              }}
            />
            <Divider
              orientation="vertical"
              sx={{
                display: 'block',
                height: 22,
                [theme.breakpoints.down('md')]: {
                  display: 'none',
                },
              }}
            />
          </>
        }
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{
          alignItems: 'center',
          backgroundColor: theme.palette.catskillWhite,
          px: 2.5,
          py: 1,
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          borderBottom: 1,
          borderColor: theme.palette.blueHaze,
          ...(readonly && {
            display: 'none',
          }),
          [theme.breakpoints.down('md')]: {
            px: 0,
            pb: 1.75,
            pt: 1.5,
          },
        }}
      >
        <Box
          sx={{
            boxSizing: 'border-box',
            width: 'auto',
            px: 0,
            [theme.breakpoints.down('md')]: {
              width: 1,
              px: 2,
            },
          }}
        >
          <LogTypeSelect />
        </Box>
        <Stack
          direction={{
            xs: 'column',
            md: 'row',
          }}
          spacing={1.5}
          sx={{
            flexGrow: 1,
            alignItems: 'center',
            boxSizing: 'border-box',
            width: 1,
            px: 0,
            [theme.breakpoints.down('md')]: {
              px: 2,
            },
          }}
        >
          <FormControl fullWidth>
            <TextField
              onChange={(event) => {
                handleChange(event.target.value);
              }}
              error={!isValidUrl}
              value={previewUrl}
              placeholder="Paste a link here"
            />
          </FormControl>
        </Stack>
      </Stack>
      <Box
        sx={{
          p: readonly ? 0 : 2,
          width: readonly ? 1 : 0.7,
          maxWidth: 1,
          mx: 'auto',
        }}
      >
        {normalizedPreviewUrl && <PreviewLink url={normalizedPreviewUrl} />}
      </Box>
    </Box>
  );
};
