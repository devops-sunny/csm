import type { BaseSyntheticEvent, FunctionComponent } from 'react';
import { CancelOutlined } from '@mui/icons-material';
import { Box, Divider, IconButton, Stack, Typography } from '@mui/material';
import type { SxProps } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/system';
import Image from 'next/image';
import toast from 'react-hot-toast';

import { LogTypeSelect } from '@features/managers-log-detail/components/common/log-type-select';
import { IMAGE_FILE_SIZE_LIMIT } from '@features/managers-log-detail/constants/common';
import { createEditLogEntryModalAtom } from '@features/managers-log-detail/states/modals-drawers';
import { UploadButton } from '@shared/components/common/upload-button';
import { ACCEPT_IMAGE_TYPES } from '@shared/constants/common';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { openImageViewModal } from '@shared/services/control-image-view-modal';
import { uploadFile } from '@shared/services/upload-file';
import { UploadFileType } from '@shared/types/common';

export type AlbumTypeTypeProps = {
  sx?: SxProps<Theme>;
  readonly?: boolean;
  mediaFiles?: string[];
  userName?: string;
};

export const AlbumType: FunctionComponent<AlbumTypeTypeProps> = ({
  sx,
  readonly,
  mediaFiles,
  userName = '',
}) => {
  const theme = useTheme();

  const handleAddPicture = (fileUrls: Array<string>) => {
    const createEditLogEntry = defaultStore.get(createEditLogEntryModalAtom);

    const validFileUrls = fileUrls.filter(Boolean);

    if (createEditLogEntry) {
      defaultStore.set(createEditLogEntryModalAtom, (prev) => {
        if (prev) {
          prev.mediaFiles = [...(prev.mediaFiles ?? []), ...validFileUrls];
        }

        return prev;
      });
    }
  };

  const handleUpload = async (event: BaseSyntheticEvent) => {
    const { files } = event.target;

    const fileUrls = await Promise.all(
      [...files].map(async (file) => {
        const fileSizeInKB = file.size / 1024;

        if (fileSizeInKB > IMAGE_FILE_SIZE_LIMIT) {
          toast.error('File size must be less than 25MB');

          return '';
        }

        const fileUrl = await uploadFile(file, UploadFileType.Log);

        return fileUrl;
      }),
    );

    handleAddPicture(fileUrls);
  };

  const handleRemovePicture = (fileUrl: string) => {
    const createEditLogEntry = defaultStore.get(createEditLogEntryModalAtom);

    if (createEditLogEntry) {
      defaultStore.set(createEditLogEntryModalAtom, (prev) => {
        if (prev) {
          prev.mediaFiles = prev.mediaFiles?.filter((file) => file !== fileUrl);
        }

        return prev;
      });
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.white,
        [theme.breakpoints.down('md')]: {
          minWidth: 0,
        },
      }}
    >
      <Stack
        spacing={1.75}
        divider={
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
        }
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
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
            width: 1,
            px: 0,
            [theme.breakpoints.down('md')]: {
              px: 2,
            },
          }}
        >
          <LogTypeSelect />
        </Box>
        <UploadButton
          sx={{
            whiteSpace: 'nowrap',
            px: 4,
          }}
          onChange={handleUpload}
          multiple
          accept={ACCEPT_IMAGE_TYPES}
        >
          Upload Pictures
        </UploadButton>
      </Stack>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, minmax(0px, 1fr))',
            md: 'repeat(3, minmax(0px, 1fr))',
          },
          maxWidth: '100vw',
          gap: 3,
          p: 2.5,
          [theme.breakpoints.down('md')]: {
            gap: readonly ? 1 : 4.5,
          },
          ...(readonly && {
            border: 'none',
            p: 0,
          }),
          ...sx,
        }}
      >
        {mediaFiles?.map((file, fileIndex) => {
          const fileName = file.split('/').pop();

          return (
            <Stack
              key={file}
              spacing={1}
            >
              <Box
                sx={{
                  width: 1,
                  pt: '100%',
                  flexShrink: 0,
                  position: 'relative',
                }}
              >
                <Image
                  src={file}
                  alt="file"
                  fill
                  loading="lazy"
                  quality={50}
                  sizes="200px"
                  style={{
                    objectFit: 'cover',
                    cursor: 'pointer',
                  }}
                  onClick={() =>
                    openImageViewModal({
                      mediaList: mediaFiles.map((src, idx) => ({
                        id: idx,
                        mediaUrl: src,
                        mediaName: '',
                      })),
                      initialSlideIdx: fileIndex,
                      FooterComponent: () => (
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                        >
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 400 }}
                            >
                              Uploaded by
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ fontWeight: 500 }}
                            >
                              {userName}
                            </Typography>
                          </Box>
                        </Stack>
                      ),
                    })
                  }
                />
              </Box>
              {!readonly && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Typography noWrap>{fileName}</Typography>
                  <IconButton
                    size="icon-only"
                    sx={{ color: theme.palette.salmonPearl }}
                    onClick={() => handleRemovePicture(file)}
                  >
                    <CancelOutlined />
                  </IconButton>
                </Box>
              )}
            </Stack>
          );
        })}
      </Box>
    </Box>
  );
};
