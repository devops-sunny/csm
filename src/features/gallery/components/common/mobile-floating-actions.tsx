import { DateRange as DateRangeIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import type { DateRange } from 'react-day-picker';

import FilterIcon from '@assets/icons/common/filter.svg';
import PlusIcon from '@assets/icons/common/plus.svg';
import { GalleryTabs } from '@features/gallery/constants/common';
import { useUploadMedia } from '@features/gallery/hooks/api/use-upload-media';
import {
  activeTabAtom,
  editModeActiveAtom,
  selectedDateRangeAtom,
  selectedFacilityIdsAtom,
} from '@features/gallery/states/common';
import { MobileDrawerDateRangePicker } from '@shared/components/common/date-range-picker/mobile-drawer-date-range-picker';
import { MobileFacilitiesSelect } from '@shared/components/common/mobile-facilities-select';
import { UploadButton } from '@shared/components/common/upload-button';
import { ACCEPT_IMAGE_TYPES } from '@shared/constants/common';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const MobileFloatingActions = () => {
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
        position: 'fixed',
        zIndex: 10,
        bottom: 16,
        right: 32,
        display: 'flex',
        gap: 2.75,
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
      }}
    >
      <MobileDrawerDateRangePicker
        title="Date"
        dateRangePickerProps={{
          value: selectedDateRangeValue,
          onChange: handleSelectDateRange,
        }}
        TriggerComponent={({ openDrawer }) => (
          <IconButton onClick={openDrawer}>
            <DateRangeIcon />
          </IconButton>
        )}
      />
      {activeTab === GalleryTabs.ManagersLogGallery && (
        <MobileFacilitiesSelect
          title="Facilities"
          TriggerComponent={({ onOpen }) => (
            <IconButton onClick={onOpen}>
              <FilterIcon />
            </IconButton>
          )}
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
      )}
      {activeTab === GalleryTabs.OtherPictures && (
        <UploadButton
          multiple
          accept={ACCEPT_IMAGE_TYPES}
          sx={{ minWidth: 48, px: 0 }}
          onChange={upload}
        >
          <PlusIcon />
        </UploadButton>
      )}
    </Box>
  );
};
