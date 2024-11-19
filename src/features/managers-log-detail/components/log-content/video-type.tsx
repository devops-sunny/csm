import {
  useEffect,
  useRef,
  useState,
  type BaseSyntheticEvent,
  type FunctionComponent,
} from 'react';
import {
  Box,
  Divider,
  FormControl,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import type { SxProps } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/system';
import { useAtomValue } from 'jotai';

import FieldErrorRoundedIcon from '@assets/icons/common/field-error-rounded.svg';
import { LogTypeSelect } from '@features/managers-log-detail/components/common/log-type-select';
import {
  ACCEPT_VIDEO_TYPES,
  CLOUD_SMALL_FILE_LIMIT,
} from '@features/managers-log-detail/constants/common';
import { URL_REGEX } from '@features/managers-log-detail/constants/regex';
import { createEditLogEntryModalAtom } from '@features/managers-log-detail/states/modals-drawers';
import { PreviewVideo } from '@shared/components/common/preview/preview-video';
import { UploadButton } from '@shared/components/common/upload-button';
import { chunkedUpload } from '@shared/libs/cloudinary/chunked-upload';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { getUrlPreviewData } from '@shared/services/get-url-preview-data';
import { uploadFile } from '@shared/services/upload-file';
import { UploadFileType } from '@shared/types/common';
import { isFileUrl } from '@shared/utils/is-file-url';

export type VideoTypeProps = {
  sx?: SxProps<Theme>;
  readonly?: boolean;
  videoUrl?: string;
};

export const VideoType: FunctionComponent<VideoTypeProps> = ({
  sx,
  readonly,
  videoUrl,
}) => {
  const theme = useTheme();

  const createEditLogEntry = useAtomValue(createEditLogEntryModalAtom);

  const [videoFileName, setVideoFileName] = useState('');

  const [inputValue, setInputValue] = useState(videoUrl ?? '');

  const titleAbortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!videoUrl) return () => {};

    const updateVideoFileName = async () => {
      const isVideoFileUrl = isFileUrl(videoUrl);

      if (isVideoFileUrl) {
        const { pathname } = new URL(videoUrl);

        const uploadedFileName = pathname.split('/').pop();

        const [fileName, fileExtension] = uploadedFileName?.split('.') ?? [];

        const isLongFileName = fileName.length > 20;

        if (isLongFileName) {
          const shortedFileName = `${fileName.slice(0, 15)}...${fileName.slice(15, 20)}`;

          setVideoFileName(
            `${shortedFileName}.${fileExtension.toLocaleLowerCase()}`,
          );

          return;
        }

        setVideoFileName(uploadedFileName ?? '');
      } else {
        const abortController = new AbortController();

        titleAbortControllerRef.current = abortController;

        const { signal } = abortController;

        try {
          setVideoFileName('Loading title...');

          const { title } = await getUrlPreviewData(videoUrl, { signal });

          setVideoFileName(title);
        } catch (error) {
          if (error instanceof DOMException && error.name === 'AbortError') {
            setVideoFileName('');
          } else {
            setVideoFileName('Failed to load title');
          }
        }
      }
    };

    updateVideoFileName();

    return () => {
      titleAbortControllerRef.current?.abort();
    };
  }, [videoUrl]);

  const updateLogEntryMedia = (value?: string) => {
    if (createEditLogEntry) {
      defaultStore.set(createEditLogEntryModalAtom, (prev) => {
        if (prev) {
          prev.mediaFiles = value ? [value] : undefined;
        }

        return prev;
      });
    }
  };

  const handleBlur = async () => {
    if (!videoUrl || !isValidVideoUrl) {
      setVideoFileName('');
    }

    updateLogEntryMedia(inputValue);
  };

  const handleClear = () => {
    setVideoFileName('');

    updateLogEntryMedia();

    setInputValue('');

    titleAbortControllerRef.current?.abort();
  };

  const handleUpload = async (event: BaseSyntheticEvent) => {
    const { files } = event.target;

    const file = files[0];

    const fileSizeInKB = file.size / 1024;

    if (fileSizeInKB > CLOUD_SMALL_FILE_LIMIT) {
      await chunkedUpload({
        file,
        onSuccess: (responseData) => {
          updateLogEntryMedia(responseData.secure_url);
        },
      });

      return;
    }

    const fileUrl = await uploadFile(file, UploadFileType.Log);

    updateLogEntryMedia(fileUrl);
  };

  const isValidVideoUrl = URL_REGEX.test(videoUrl ?? '');

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
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          borderBottom: 1,
          borderColor: theme.palette.blueHaze,
          px: 2.5,
          py: 1,
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
          {!videoFileName && (
            <FormControl fullWidth>
              <TextField
                value={inputValue}
                onChange={(event) => {
                  setInputValue(event.target.value);
                }}
                onBlur={() => handleBlur()}
                placeholder="Video URL"
                error={!isValidVideoUrl}
              />
            </FormControl>
          )}
          {videoFileName && (
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ flexGrow: 1 }}
            >
              <Typography
                variant="body1"
                color={theme.palette.eastBay}
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '40ch',
                }}
              >
                {videoFileName}
              </Typography>
              <IconButton
                size="icon-only"
                sx={{ color: theme.palette.salmonPearl }}
                onClick={handleClear}
              >
                <FieldErrorRoundedIcon />
              </IconButton>
            </Stack>
          )}
          <UploadButton
            sx={{
              width: 'auto',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              px: 4,
            }}
            onChange={handleUpload}
            accept={ACCEPT_VIDEO_TYPES}
          >
            {videoUrl ? 'Replace Video' : 'Upload a Video'}
          </UploadButton>
        </Stack>
      </Stack>
      <Box
        sx={{
          p: readonly ? 0 : 3,
          aspectRatio: readonly ? 16 / 9 : 'auto',
          [theme.breakpoints.down('md')]: {
            p: 0,
          },
          ...sx,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            backgroundColor: theme.palette.catskillWhite,
          }}
        >
          {videoUrl && <PreviewVideo userInputUrl={videoUrl} />}
        </Box>
      </Box>
    </Box>
  );
};
