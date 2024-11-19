import { useState } from 'react';
import {
  Box,
  FormControl,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';

import { DASHBOARD_CELL_RATIO } from '@features/dashboard/constants/layout';
import { dateFormatter } from '@features/dashboard/utils/date-formatter';
import { BaseDatePickerTrigger } from '@shared/components/common/date-picker/base-date-picker-trigger';
import { DatePicker } from '@shared/components/common/date-picker/date-picker';
import { MobileDatePickerDrawer } from '@shared/components/common/date-picker/mobile-date-picker-drawer';
import { FacilitiesSelect } from '@shared/components/common/facilities-select';
import { MobileFacilitySelect } from '@shared/components/common/mobile-facility-select';
import { openImageViewModal } from '@shared/services/control-image-view-modal';

const mockMediaFiles = [
  {
    id: 1,
    mediaName: 'test-1',
    mediaUrl: '/assets/images/mock/food1.jpg',
  },
  {
    id: 2,
    mediaName: 'test-2',
    mediaUrl: '/assets/images/mock/food2.jpg',
  },
  {
    id: 3,
    mediaName: 'test-3',
    mediaUrl: '/assets/images/mock/food3.jpg',
  },
  {
    id: 4,
    mediaName: 'test-4',
    mediaUrl: '/assets/images/mock/food4.jpg',
  },
  {
    id: 5,
    mediaName: 'test-5',
    mediaUrl: '/assets/images/mock/food5.jpg',
  },
  {
    id: 6,
    mediaName: 'test-6',
    mediaUrl: '/assets/images/mock/food6.jpg',
  },
];

export const LatestFoodGallery = () => {
  const theme = useTheme();

  const [date, setDate] = useState<Date | undefined>();

  return (
    <Box
      sx={{
        width: 1,
        height: 1,
        display: 'flex',
        flexFlow: 'column',
        [theme.breakpoints.down('md')]: {
          aspectRatio: DASHBOARD_CELL_RATIO,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2.25,
          alignItems: 'center',
          mb: 1,
          width: 1,
        }}
      >
        <FormControl
          sx={{
            flex: 1,
            [theme.breakpoints.down('md')]: {
              display: 'none',
            },
          }}
        >
          <DatePicker
            TriggerComponent={({ toggle, clearValue, selectedValue }) => (
              <BaseDatePickerTrigger
                placeholder="Select Date"
                sx={{ width: 1 }}
                onClick={toggle}
                onClear={clearValue}
                value={dateFormatter(selectedValue)}
              />
            )}
          />
        </FormControl>
        <FormControl
          sx={{
            flex: 1,
            [theme.breakpoints.up('md')]: {
              display: 'none',
            },
          }}
        >
          <MobileDatePickerDrawer
            datePickerProps={{
              value: date,
              onChange: (value) => setDate(value),
            }}
            TriggerComponent={({ openDrawer, selectedDate }) => (
              <BaseDatePickerTrigger
                placeholder="Select Date"
                sx={{ width: 1 }}
                onClick={openDrawer}
                onClear={() => setDate(undefined)}
                value={dateFormatter(selectedDate)}
              />
            )}
          />
        </FormControl>
        <FormControl
          sx={{
            flex: 1,
            [theme.breakpoints.down('md')]: {
              display: 'none',
            },
          }}
        >
          <FacilitiesSelect
            selectedIds={[]}
            onSelect={() => {}}
          />
        </FormControl>
        <FormControl
          sx={{
            flex: 1,
            display: 'none',
            [theme.breakpoints.down('md')]: {
              display: 'block',
            },
          }}
        >
          <MobileFacilitySelect
            sx={{
              '.MuiInputBase-root': {
                width: 1,
              },
            }}
          />
        </FormControl>
      </Box>
      <Paper sx={{ flex: 1, p: 1.5, display: 'flex', flexFlow: 'column' }}>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 600,
            mb: 1,
            ml: 0.75,
            flexShrink: 0,
            [theme.breakpoints.down('md')]: {
              fontWeight: 500,
            },
          }}
        >
          Italian ego
        </Typography>
        <Box
          sx={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'repeat(2, auto)',
            gap: 1,
          }}
        >
          {mockMediaFiles.map(({ mediaUrl }, fileIndex) => {
            const fileName = mediaUrl.split('/').pop();

            return (
              <Box
                key={mediaUrl}
                sx={{
                  position: 'relative',
                  backgroundColor: theme.palette.azure,
                  height: 1,
                  width: 1,
                }}
              >
                <Image
                  src={mediaUrl}
                  alt={fileName ?? ''}
                  fill
                  loading="lazy"
                  quality={50}
                  style={{ objectFit: 'cover', cursor: 'pointer' }}
                  onClick={() =>
                    openImageViewModal({
                      mediaList: mockMediaFiles,
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
                              John Doe
                            </Typography>
                          </Box>
                        </Stack>
                      ),
                    })
                  }
                />
              </Box>
            );
          })}
        </Box>
      </Paper>
    </Box>
  );
};
