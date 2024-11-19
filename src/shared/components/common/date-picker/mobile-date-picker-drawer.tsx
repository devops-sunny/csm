import { useState, type FunctionComponent } from 'react';
import { Button } from '@mui/material';

import {
  DatePicker,
  type DatePickerProps,
} from '@shared/components/common/date-picker/date-picker';
import { MobileFullScreenDrawer } from '@shared/components/common/mobile-full-screen-drawer';

type TriggerComponent = (input: {
  openDrawer: (event: React.MouseEvent<HTMLElement>) => void;
  selectedDate?: Date;
}) => JSX.Element;

type MobileDatePickerDrawerProps = {
  title?: string;
  open?: boolean;
  datePickerProps: Omit<DatePickerProps, 'TriggerComponent'>;
  onOpenChange?: (open: boolean) => void;
  TriggerComponent?: TriggerComponent;
};

export const MobileDatePickerDrawer: FunctionComponent<
  MobileDatePickerDrawerProps
> = ({ title, open, datePickerProps, onOpenChange, TriggerComponent }) => {
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
        <DatePicker {...datePickerProps} />
      </MobileFullScreenDrawer>
      {TriggerComponent?.({
        openDrawer: () => handleToggle(true),
        selectedDate: datePickerProps.value,
      })}
    </>
  );
};
