import { useState, useEffect } from 'react';
import { LoadingButton } from '@mui/lab';
import { Button, FormControl, FormLabel, Stack } from '@mui/material';
import { useAtomValue } from 'jotai';

import { useMutationNewLog } from '@features/managers-log-listing/hooks/api/use-mutation-new-log';
import { mobileOpenNewLogDrawerAtom } from '@features/managers-log-listing/states/modals-drawers';
import { dateFormatter } from '@features/managers-log-listing/utils/date-formatter';
import { BaseDatePickerTrigger } from '@shared/components/common/date-picker/base-date-picker-trigger';
import { MobileDatePickerDrawer } from '@shared/components/common/date-picker/mobile-date-picker-drawer';
import { MobileDrawer } from '@shared/components/common/mobile-drawer';
import { MobileFacilitySelect } from '@shared/components/common/mobile-facility-select';
import { APP_MOBILE_FOOTER_ACTIONS_HEIGHT } from '@shared/constants/layout';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const MobileNewLogDrawer = () => {
  const [facilityId, setFacilityId] = useState<number>();

  const [date, setDate] = useState<Date | undefined>(new Date());

  const open = useAtomValue(mobileOpenNewLogDrawerAtom);

  const { trigger, isMutating } = useMutationNewLog(facilityId);

  useEffect(() => {
    if (open) {
      setFacilityId(undefined);
      setDate(new Date());
    }
  }, [open]);

  const handleCreateLog = async () => {
    if (!date || !facilityId) {
      return;
    }

    const formattedDate = new Date(date).toISOString();

    await trigger({ facilityId, date: formattedDate });

    defaultStore.set(mobileOpenNewLogDrawerAtom, false);
  };

  return (
    <MobileDrawer
      open={open}
      anchor="bottom"
      showCloseArrow={false}
      onClose={() => {
        defaultStore.set(mobileOpenNewLogDrawerAtom, false);
      }}
      onOpen={() => {
        defaultStore.set(mobileOpenNewLogDrawerAtom, true);
      }}
      anchorGap={APP_MOBILE_FOOTER_ACTIONS_HEIGHT}
      title="New Log"
    >
      <Stack sx={{ my: 1.5, mx: 3.25 }}>
        <FormControl
          fullWidth
          sx={{ mb: 1, '.MuiInputBase-root': { width: 1 } }}
        >
          <FormLabel component="legend">Select Location</FormLabel>
          <MobileFacilitySelect
            onChange={setFacilityId}
            value={facilityId}
          />
        </FormControl>
        <FormControl
          fullWidth
          sx={{ mb: 2 }}
        >
          <FormLabel component="legend">Select Date</FormLabel>
          <MobileDatePickerDrawer
            datePickerProps={{
              value: date,
              onChange: setDate,
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
        <Stack
          direction="row"
          spacing={3.25}
        >
          <Button
            sx={{ px: 7, flexGrow: 1 }}
            variant="contained"
            onClick={() => defaultStore.set(mobileOpenNewLogDrawerAtom, false)}
          >
            Cancel
          </Button>
          <LoadingButton
            sx={{ px: 7, flexGrow: 1 }}
            loading={isMutating}
            onClick={handleCreateLog}
            disabled={!facilityId || !date}
          >
            Create
          </LoadingButton>
        </Stack>
      </Stack>
    </MobileDrawer>
  );
};
