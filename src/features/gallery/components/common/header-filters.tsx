import { FormControl } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import type { DateRange } from 'react-day-picker';

import { GalleryTabs } from '@features/gallery/constants/common';
import { useUploadMedia } from '@features/gallery/hooks/api/use-upload-media';
import {
  activeTabAtom,
  editModeActiveAtom,
  selectedDateRangeAtom,
  selectedFacilityIdsAtom,
} from '@features/gallery/states/common';
import { BaseDateRangeTrigger } from '@shared/components/common/date-range-picker/base-date-range-trigger';
import { DateRangePicker } from '@shared/components/common/date-range-picker/date-range-picker';
import { FacilitiesSelect } from '@shared/components/common/facilities-select';
import { UploadButton } from '@shared/components/common/upload-button';
import { ACCEPT_IMAGE_TYPES } from '@shared/constants/common';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { stringifyDateRangeValue } from '@shared/utils/stringify-date-range-value';

export const HeaderFilters = () => {
  const theme = useTheme();

  const activeTab = useAtomValue(activeTabAtom);

  const selectedFacilityIds = useAtomValue(selectedFacilityIdsAtom);

  const selectedDateRange = useAtomValue(selectedDateRangeAtom);

  const editModeActive = useAtomValue(editModeActiveAtom);

  const { upload } = useUploadMedia();

  const handleSelectDateRange = ({ from, to }: DateRange) => {
    const parsedFrom = from
      ? dayjs(from).startOf('day').toISOString()
      : undefined;

    const parsedTo = to ? dayjs(to).endOf('day').toISOString() : undefined;

    defaultStore.set(selectedDateRangeAtom, {
      from: parsedFrom,
      to: parsedTo,
    });
  };

  const selectedDateRangeValue = {
    from: selectedDateRange.from ? new Date(selectedDateRange.from) : undefined,
    to: selectedDateRange.to ? new Date(selectedDateRange.to) : undefined,
  };

  if (editModeActive) {
    return null;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        alignSelf: 'center',
        [theme.breakpoints.down('md')]: {
          display: 'none',
        },
      }}
    >
      {activeTab === GalleryTabs.ManagersLogGallery && (
        <FormControl sx={{ minWidth: 200 }}>
          <FacilitiesSelect
            selectedIds={selectedFacilityIds ?? []}
            onSelect={(facilityIds) => {
              defaultStore.set(selectedFacilityIdsAtom, facilityIds);
            }}
            onLoadedFacilities={(facilityIds) => {
              if (!selectedFacilityIds) {
                defaultStore.set(selectedFacilityIdsAtom, facilityIds);
              }
            }}
          />
        </FormControl>
      )}
      <FormControl sx={{ width: 230 }}>
        <DateRangePicker
          onChange={handleSelectDateRange}
          value={selectedDateRangeValue}
          TriggerComponent={({ toggle, clearValue, selectedValue }) => (
            <BaseDateRangeTrigger
              fullWidth
              placeholder="Select date range"
              onClick={toggle}
              onClear={clearValue}
              value={stringifyDateRangeValue(selectedValue)}
            />
          )}
        />
      </FormControl>
      {activeTab === GalleryTabs.OtherPictures && (
        <UploadButton
          multiple
          accept={ACCEPT_IMAGE_TYPES}
          sx={{ minWidth: 180 }}
          onChange={upload}
        >
          New Upload
        </UploadButton>
      )}
    </Box>
  );
};
