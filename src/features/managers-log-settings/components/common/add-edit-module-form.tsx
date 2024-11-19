import type { FunctionComponent } from 'react';
import { Fragment, useEffect, useRef } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  FormControl,
  FormControlLabel,
  TextField,
  FormLabel,
  Checkbox,
  Divider,
  Typography,
  Stack,
  Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';

import { useAddEditModuleForm } from '@features/managers-log-settings/hooks/use-add-edit-module-form';
import {
  addEditModuleAtom,
  mobileAddEditModuleAtom,
} from '@features/managers-log-settings/states/common';
import { APP_MOBILE_FOOTER_ACTIONS_HEIGHT } from '@shared/constants/layout';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { LogEntryType } from '@shared/types/api/generated';

type AddEditModuleFormProps = {
  stateAtom: typeof mobileAddEditModuleAtom | typeof addEditModuleAtom;
};

export const AddEditModuleForm: FunctionComponent<AddEditModuleFormProps> = ({
  stateAtom,
}) => {
  const theme = useTheme();

  const addEditModule = useAtomValue(stateAtom);

  const { submit, isSubmitting } = useAddEditModuleForm(addEditModule);

  const addEditModuleRef = useRef<typeof addEditModule>(null);

  useEffect(() => {
    if (addEditModule) {
      addEditModuleRef.current = addEditModule;
    }
  }, [addEditModule]);

  const editModule = addEditModule ?? addEditModuleRef.current;

  const { id, headerTitle, allowedTypes = [] } = editModule ?? {};

  const isAdd = !id;

  return (
    <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          [theme.breakpoints.up('md')]: {
            py: 2.25,
            px: 10,
          },
        }}
      >
        <FormControl
          fullWidth
          sx={{
            [theme.breakpoints.up('md')]: { my: 2.25 },
            [theme.breakpoints.down('md')]: {
              pt: 1.5,
              pb: 2.25,
              px: 3.5,
              boxSizing: 'border-box',
              backgroundColor: theme.palette.catskillWhite,
            },
          }}
        >
          <FormLabel component="legend">Section Name</FormLabel>
          <TextField
            value={headerTitle ?? ''}
            onChange={({ target: { value } }) => {
              defaultStore.set(stateAtom, (prev) => ({
                ...prev,
                headerTitle: value,
              }));
            }}
          />
        </FormControl>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.azure,
            mb: 1,
            [theme.breakpoints.down('md')]: {
              display: 'none',
            },
          }}
        >
          Allowed Types
        </Typography>
        <Box
          sx={{
            [theme.breakpoints.up('md')]: {
              py: 1.75,
              px: 2.25,
              backgroundColor: theme.palette.catskillWhite,
              borderRadius: 1.25,
            },
          }}
        >
          <FormControl
            sx={{
              [theme.breakpoints.down('md')]: {
                my: 2.25,
                mx: 3,
              },
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  indeterminate={
                    allowedTypes.length > 0 && allowedTypes.length < 5
                  }
                />
              }
              label="Choose All"
              checked={allowedTypes.length === 5}
              onChange={() => {
                if (allowedTypes.length === 5) {
                  defaultStore.set(stateAtom, (prev) => ({
                    ...prev,
                    allowedTypes: [],
                  }));
                } else {
                  defaultStore.set(stateAtom, (prev) => ({
                    ...prev,
                    allowedTypes: [
                      LogEntryType.TextImage,
                      LogEntryType.Video,
                      LogEntryType.Album,
                      LogEntryType.Link,
                      LogEntryType.Document,
                    ],
                  }));
                }
              }}
            />
          </FormControl>
          <Divider
            sx={{
              [theme.breakpoints.up('md')]: {
                my: 1.5,
              },
            }}
          />
          <Box
            sx={{
              [theme.breakpoints.up('md')]: {
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                rowGap: 2.75,
                columnGap: 2,
              },
              [theme.breakpoints.down('md')]: {
                display: 'flex',
                flexFlow: 'column',
              },
            }}
          >
            {[
              {
                label: 'Text & Picture',
                type: LogEntryType.TextImage,
              },
              {
                label: 'Video',
                type: LogEntryType.Video,
              },
              {
                label: 'Album',
                type: LogEntryType.Album,
              },
              {
                label: 'Link',
                type: LogEntryType.Link,
              },
              {
                label: 'Document',
                type: LogEntryType.Document,
              },
            ].map(({ label, type }) => (
              <Fragment key={type}>
                <FormControl
                  sx={{
                    [theme.breakpoints.down('md')]: {
                      py: 2.25,
                      ml: 5,
                    },
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox />}
                    label={label}
                    checked={allowedTypes.includes(type)}
                    onChange={() => {
                      defaultStore.set(stateAtom, (prev) => {
                        if (prev?.allowedTypes?.includes(type)) {
                          return {
                            ...prev,
                            allowedTypes: prev.allowedTypes.filter(
                              (allowedType) => allowedType !== type,
                            ),
                          };
                        }

                        return {
                          ...prev,
                          allowedTypes: [...(prev?.allowedTypes ?? []), type],
                        };
                      });
                    }}
                  />
                </FormControl>
                <Divider
                  sx={{
                    [theme.breakpoints.up('md')]: {
                      display: 'none',
                    },
                  }}
                />
              </Fragment>
            ))}
          </Box>
        </Box>
      </Box>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          mt: 'auto',
          [theme.breakpoints.up('md')]: {
            backgroundColor: theme.palette.catskillWhite,
            justifyContent: 'center',
            boxSizing: 'border-box',
            height: 64,
            gap: 3,
            py: 1,
            px: 10,
          },
          [theme.breakpoints.down('md')]: {
            backgroundColor: theme.palette.cello,
            justifyContent: 'space-between',
            height: APP_MOBILE_FOOTER_ACTIONS_HEIGHT,
            gap: 4,
            px: 1,
          },
        }}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            defaultStore.set(addEditModuleAtom, null);
            defaultStore.set(mobileAddEditModuleAtom, null);
          }}
        >
          Cancel
        </Button>
        <LoadingButton
          fullWidth
          onClick={submit}
          loading={isSubmitting}
          disabled={!headerTitle || allowedTypes.length === 0}
        >
          {isAdd ? 'Add' : 'Save'}
        </LoadingButton>
      </Stack>
    </Box>
  );
};
