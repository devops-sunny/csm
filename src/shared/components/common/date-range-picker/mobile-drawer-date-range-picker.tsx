import { useState, type FunctionComponent } from 'react';
import { Button } from '@mui/material';
import type { DateRange } from 'react-day-picker';

import type { DateRangePickerProps } from '@shared/components/common/date-range-picker/date-range-picker';
import { DateRangePicker } from '@shared/components/common/date-range-picker/date-range-picker';
import { MobileFullScreenDrawer } from '@shared/components/common/mobile-full-screen-drawer';

type TriggerComponent = (input: {
  selectedRange: DateRange;
  openDrawer: (event: React.MouseEvent<HTMLElement>) => void;
}) => JSX.Element;

type MobileDrawerDateRangePickerProps = {
  title?: string;
  open?: boolean;
  dateRangePickerProps?: Omit<DateRangePickerProps, 'TriggerComponent'>;
  onOpenChange?: (open: boolean) => void;
  TriggerComponent?: TriggerComponent;
};

export const MobileDrawerDateRangePicker: FunctionComponent<
  MobileDrawerDateRangePickerProps
> = ({ title, open, dateRangePickerProps, onOpenChange, TriggerComponent }) => {
  const [selfOpen, setSelfOpen] = useState(false);

  const handleToggle = (status: boolean) => {
    if (onOpenChange) {
      onOpenChange(status);
    } else {
      setSelfOpen(status);
    }
  };

  return (
    <>
      <MobileFullScreenDrawer
        open={open ?? selfOpen}
        title={title}
        onOpen={() => handleToggle(true)}
        onClose={() => handleToggle(false)}
        footerActions={
          <Button
            sx={{ width: 155 }}
            onClick={() => handleToggle(false)}
          >
            Close
          </Button>
        }
      >
        <DateRangePicker {...dateRangePickerProps} />
      </MobileFullScreenDrawer>
      {TriggerComponent?.({
        selectedRange: dateRangePickerProps?.value ?? {
          from: undefined,
          to: undefined,
        },
        openDrawer: () => handleToggle(true),
      })}
    </>
  );
};
