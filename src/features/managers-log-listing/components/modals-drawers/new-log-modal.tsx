'use client';

import { useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';

import { useMutationNewLog } from '@features/managers-log-listing/hooks/api/use-mutation-new-log';
import { openNewLogModalAtom } from '@features/managers-log-listing/states/modals-drawers';
import { dateFormatter } from '@features/managers-log-listing/utils/date-formatter';
import { BaseDatePickerTrigger } from '@shared/components/common/date-picker/base-date-picker-trigger';
import { DatePicker } from '@shared/components/common/date-picker/date-picker';
import { FacilitySelect } from '@shared/components/common/facility-select';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const NewLogModal = () => {
  const [facilityId, setFacilityId] = useState<number>(0);

  const [date, setDate] = useState<Date | undefined>(new Date());

  const theme = useTheme();

  const open = useAtomValue(openNewLogModalAtom);

  const { trigger, isMutating } = useMutationNewLog(facilityId);

  useEffect(() => {
    if (open) {
      setFacilityId(0);
      setDate(new Date());
    }
  }, [open]);

  const handleCreateLog = async () => {
    if (!date) {
      return;
    }

    const formattedDate = date.toISOString();

    await trigger({ facilityId, date: formattedDate });

    defaultStore.set(openNewLogModalAtom, false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle
        sx={{
          display: 'flex',
          flexFlow: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: theme.palette.white }}
        >
          New Log
        </Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          width: 380,
          boxSizing: 'border-box',
          m: 0,
          pb: 2.5,
          px: 6,
          display: 'flex',
          flexFlow: 'column',
          gap: 2.25,
        }}
      >
        <FormControl
          fullWidth
          sx={{ mt: 2.5 }}
        >
          <FormLabel component="legend">Select Location</FormLabel>
          <FacilitySelect
            onChange={setFacilityId}
            value={facilityId}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel component="legend">Select Date</FormLabel>
          <DatePicker
            value={date}
            onChange={setDate}
            TriggerComponent={({ toggle, selectedValue }) => (
              <BaseDatePickerTrigger
                placeholder="Select Date"
                sx={{ width: 1 }}
                onClick={toggle}
                onClear={() => setDate(undefined)}
                value={dateFormatter(selectedValue)}
              />
            )}
          />
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ gap: 2 }}>
        <Button
          sx={{ px: 7 }}
          variant="contained"
          onClick={() => {
            defaultStore.set(openNewLogModalAtom, false);
          }}
        >
          Cancel
        </Button>
        <LoadingButton
          sx={{ px: 7 }}
          loading={isMutating}
          onClick={handleCreateLog}
          disabled={!facilityId || !date}
        >
          Create
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
