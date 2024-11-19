import { useEffect, type FunctionComponent } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAtomValue } from 'jotai';

import { useCreateReport } from '@features/managers-log-listing/hooks/api/use-create-report';
import { mobileOpenNewReportPanelAtom } from '@features/managers-log-listing/states/common';
import { dateFormatter } from '@features/managers-log-listing/utils/date-formatter';
import { BaseDatePickerTrigger } from '@shared/components/common/date-picker/base-date-picker-trigger';
import { MobileDatePickerDrawer } from '@shared/components/common/date-picker/mobile-date-picker-drawer';
import { MobileDrawer } from '@shared/components/common/mobile-drawer';
import { MobileFacilitiesSelect } from '@shared/components/common/mobile-facilities-select';
import { APP_MOBILE_FOOTER_ACTIONS_HEIGHT } from '@shared/constants/layout';
import { defaultStore } from '@shared/libs/jotai/default-store';
import { SendVia } from '@shared/types/api/generated';

export const MobileNewReportDrawer: FunctionComponent = () => {
  const theme = useTheme();

  const open = useAtomValue(mobileOpenNewReportPanelAtom);

  const { payload, updatePayload, createReport, loading, errorMessage } =
    useCreateReport({
      onSuccess: () => defaultStore.set(mobileOpenNewReportPanelAtom, false),
    });

  useEffect(() => {
    if (open) {
      updatePayload({
        facilities: [],
        startDate: undefined,
        sendVia: SendVia.Download,
      });
    }
  }, [open]);

  return (
    <MobileDrawer
      anchor="bottom"
      open={open}
      title="New Report"
      showCloseArrow={false}
      onClose={() => defaultStore.set(mobileOpenNewReportPanelAtom, false)}
      onOpen={() => defaultStore.set(mobileOpenNewReportPanelAtom, true)}
      anchorGap={APP_MOBILE_FOOTER_ACTIONS_HEIGHT}
      sx={{
        [theme.breakpoints.down('md')]: {
          zIndex: theme.zIndex.appBar + 1,
          display: 'block',
        },
      }}
    >
      <Box
        sx={{
          py: 2,
          px: 3.5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'column',
            gap: 2.25,
            maxWidth: '100%',
          }}
        >
          <FormControl>
            <FormLabel component="legend">Select Location</FormLabel>
            <MobileFacilitiesSelect
              selectedIds={payload.facilities}
              onSelect={(ids) => updatePayload({ facilities: ids })}
            />
          </FormControl>
          <Box sx={{ display: 'flex' }}>
            <FormControl sx={{ flex: 1 }}>
              <FormLabel component="legend">Select Date</FormLabel>
              <MobileDatePickerDrawer
                datePickerProps={{
                  value: payload.startDate,
                  onChange: (date) => updatePayload({ startDate: date }),
                }}
                TriggerComponent={({ openDrawer, selectedDate }) => (
                  <BaseDatePickerTrigger
                    placeholder="Select Date"
                    sx={{ width: 1 }}
                    onClick={openDrawer}
                    onClear={() => updatePayload({ startDate: undefined })}
                    value={dateFormatter(selectedDate)}
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
                sx={{ fontSize: 13 }}
                value="download"
                control={<Radio />}
                label="Download"
              />
              <FormControlLabel
                sx={{ fontSize: 13 }}
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
        <Stack
          direction="row"
          spacing={3.25}
          useFlexGap
          sx={{
            mt: 2,
          }}
        >
          <Button
            sx={{ px: 7, flexGrow: 1 }}
            variant="contained"
            onClick={() =>
              defaultStore.set(mobileOpenNewReportPanelAtom, false)
            }
          >
            Cancel
          </Button>
          <LoadingButton
            sx={{ px: 7, flexGrow: 1 }}
            disabled={!payload.facilities.length || !payload.sendVia}
            onClick={createReport}
            loading={loading}
          >
            Create
          </LoadingButton>
        </Stack>
      </Box>
    </MobileDrawer>
  );
};
