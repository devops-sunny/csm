import { useState } from 'react';
import type { ReactNode, FunctionComponent } from 'react';
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  useTheme,
} from '@mui/material';

import { MobileFullScreenDrawer } from '@shared/components/common/mobile-full-screen-drawer';

type MobileDrawerSelectOption = {
  value: string;
  label: ReactNode;
};

type TriggerComponent = (input: {
  selectedOption?: MobileDrawerSelectOption;
  onOpen: (event: React.MouseEvent<HTMLElement>) => void;
}) => JSX.Element;

export type MobileDrawerSelectProps = {
  title?: string;
  options: MobileDrawerSelectOption[];
  name?: string;
  value?: MobileDrawerSelectOption['value'];
  onChange?: (value: MobileDrawerSelectOption['value']) => void;
  TriggerComponent: TriggerComponent;
};

export const MobileDrawerSelect: FunctionComponent<MobileDrawerSelectProps> = ({
  title,
  options,
  name,
  value,
  onChange,
  TriggerComponent,
}) => {
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelectValue = (
    changedValue: MobileDrawerSelectOption['value'],
  ) => {
    handleClose();

    if (onChange) onChange(changedValue);
  };

  const selectedOption = options.find((option) => option.value === value);

  return (
    <>
      <MobileFullScreenDrawer
        open={open}
        title={title}
        onOpen={handleOpen}
        onClose={handleClose}
        footerActions={
          <Button
            sx={{ width: 155 }}
            onClick={handleClose}
          >
            Close
          </Button>
        }
      >
        <RadioGroup
          name={name}
          value={value ?? ''}
          onChange={(_, changedValue) => handleSelectValue(changedValue)}
        >
          {options.map(({ value: optionValue, label }) => (
            <FormControlLabel
              key={optionValue}
              sx={{
                height: 54,
                px: 2,
                borderBottom: 'solid 1px',
                borderColor: theme.palette.blueHaze,
                flexFlow: 'row-reverse',
                justifyContent: 'space-between',
              }}
              control={<Radio />}
              value={optionValue}
              label={label}
            />
          ))}
        </RadioGroup>
      </MobileFullScreenDrawer>
      {TriggerComponent({
        selectedOption,
        onOpen: handleOpen,
      })}
    </>
  );
};
