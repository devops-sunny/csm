import { type BaseSyntheticEvent, type FunctionComponent } from 'react';
import { Box, Divider, FormControl, Stack, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';
import toast from 'react-hot-toast';

import { LogTypeSelect } from '@features/managers-log-detail/components/common/log-type-select';
import {
  ACCEPT_DOCUMENT_TYPES,
  DOCUMENT_FILE_SIZE_LIMIT,
} from '@features/managers-log-detail/constants/common';
import { URL_REGEX } from '@features/managers-log-detail/constants/regex';
import { createEditLogEntryModalAtom } from '@features/managers-log-detail/states/modals-drawers';
import { FilePreview } from '@shared/components/common/preview/file-preview';
import { UploadButton } from '@shared/components/common/upload-button';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { uploadFile } from '@shared/services/upload-file';
import { UploadFileType } from '@shared/types/common';

export type DocumentTypeProps = {
  readonly?: boolean;
  documentFile?: string;
};

export const DocumentType: FunctionComponent<DocumentTypeProps> = ({
  readonly,
  documentFile,
}) => {
  const theme = useTheme();

  const createEditLogEntry = useAtomValue(createEditLogEntryModalAtom);

  const handleChange = (value: string) => {
    if (createEditLogEntry) {
      defaultStore.set(createEditLogEntryModalAtom, {
        ...createEditLogEntry,
        mediaFiles: value ? [value] : undefined,
      });
    }
  };

  const handleAddDocument = (fileUrl: string) => {
    if (createEditLogEntry) {
      defaultStore.set(createEditLogEntryModalAtom, (prev) => {
        if (prev) {
          prev.mediaFiles = [fileUrl];
        }

        return prev;
      });
    }
  };

  const handleUpload = async (event: BaseSyntheticEvent) => {
    const { files } = event.target;

    const file = files[0];

    const fileSizeInKB = file.size / 1024;

    if (fileSizeInKB > DOCUMENT_FILE_SIZE_LIMIT) {
      toast.error('File size must be less than 25MB');

      return;
    }

    const fileUrl = await uploadFile(file, UploadFileType.Log);

    handleAddDocument(fileUrl);
  };

  const isValidUrl = URL_REGEX.test(createEditLogEntry?.mediaFiles?.[0] ?? '');

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
                display: 'none',
                width: 1,
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
              value={documentFile ?? ''}
              onChange={(event) => handleChange(event.target.value)}
              error={!isValidUrl}
              placeholder="Document URL"
            />
          </FormControl>
          <UploadButton
            sx={{
              width: 'auto',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
            onChange={handleUpload}
            accept={ACCEPT_DOCUMENT_TYPES}
          >
            Upload a Document
          </UploadButton>
        </Stack>
      </Stack>
      <Box
        sx={{
          p: readonly ? 0 : 3,
          aspectRatio: readonly ? 4 / 3 : 'auto',
          backgroundColor: theme.palette.white,
          [theme.breakpoints.down('md')]: {
            aspectRatio: readonly ? 3 / 4 : 'auto',
            p: 0,
          },
        }}
      >
        {documentFile && (
          <FilePreview
            url={documentFile}
            readonly={readonly}
          />
        )}
      </Box>
    </Box>
  );
};
