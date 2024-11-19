'use client';

import { useEffect } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';

import { useCreateReport } from '@features/managers-log-listing/hooks/api/use-create-report';
import { openNewReportModalAtom } from '@features/managers-log-listing/states/modals-drawers';
import { dateFormatter } from '@features/managers-log-listing/utils/date-formatter';
import { BaseDatePickerTrigger } from '@shared/components/common/date-picker/base-date-picker-trigger';
import { DatePicker } from '@shared/components/common/date-picker/date-picker';
import { FacilitiesSelect } from '@shared/components/common/facilities-select';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { SendVia } from '@shared/types/api/generated';

export const NewReportModal = () => {
  const theme = useTheme();

  const open = useAtomValue(openNewReportModalAtom);

  const { payload, updatePayload, createReport, loading, errorMessage } =
    useCreateReport({
      onSuccess: () => defaultStore.set(openNewReportModalAtom, false),
    });

  useEffect(() => {
    if (open) {
      updatePayload({
        facilities: [],
        startDate: new Date(),
        sendVia: SendVia.Download,
      });
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      sx={{
        overflow: 'visible',
        '& .MuiDialog-paper': {
          overflow: 'visible',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          flexFlow: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTopLeftRadius: theme.shape.borderRadius,
          borderTopRightRadius: theme.shape.borderRadius,
        }}
      >
        <Typography
          variant="body2"
          sx={{ color: theme.palette.white }}
        >
          New Report
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ overflow: 'visible' }}>
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'column',
            gap: 2.25,
            maxWidth: '100%',
            width: 450,
            boxSizing: 'border-box',
            overflow: 'visible',
            p: 2,
            px: 5,
          }}
        >
          <FormControl fullWidth>
            <FormLabel component="legend">Select Location</FormLabel>
            <FacilitiesSelect
              selectedIds={payload.facilities}
              onSelect={(ids) => updatePayload({ facilities: ids })}
              hasCheckAll={false}
            />
          </FormControl>
          <Box sx={{ display: 'flex' }}>
            <FormControl sx={{ flex: 1 }}>
              <FormLabel component="legend">Select Date</FormLabel>
              <DatePicker
                value={payload.startDate}
                onChange={(date) => updatePayload({ startDate: date })}
                TriggerComponent={({ toggle, selectedValue }) => (
                  <BaseDatePickerTrigger
                    placeholder="Select Date"
                    sx={{ width: 1 }}
                    onClick={toggle}
                    onClear={() => updatePayload({ startDate: undefined })}
                    value={dateFormatter(selectedValue)}
                  />
                )}
              />
            </FormControl>
            <RadioGroup
              row
              sx={{ flex: 1, mt: 2 }}
              value={payload.sendVia}
              onChange={({ target: { value } }) => {
                updatePayload({ sendVia: value as SendVia });
              }}
            >
              <FormControlLabel
                value="download"
                control={<Radio />}
                label="Download"
              />
              <FormControlLabel
                value="email"
                control={<Radio />}
                label="Email"
              />
            </RadioGroup>
          </Box>
          {errorMessage && (
            <Typography
              variant="caption"
              sx={{ color: theme.palette.salmonPearl }}
            >
              {errorMessage}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          gap: 2,
          borderBottomLeftRadius: theme.shape.borderRadius,
          borderBottomRightRadius: theme.shape.borderRadius,
        }}
      >
        <Button
          sx={{ px: 7 }}
          variant="contained"
          onClick={() => {
            defaultStore.set(openNewReportModalAtom, false);
          }}
        >
          Cancel
        </Button>
        <LoadingButton
          sx={{ px: 7 }}
          disabled={!payload.facilities.length || !payload.sendVia}
          onClick={createReport}
          loading={loading}
        >
          Create
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
