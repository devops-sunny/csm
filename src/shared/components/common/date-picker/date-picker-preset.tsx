import { type FunctionComponent } from 'react';
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  useTheme,
} from '@mui/material';
import dayjs from 'dayjs';

enum DatePreset {
  Today = 'Today',
  Yesterday = 'Yesterday',
}

type DatePickerPresetProps = {
  variant: 'button-list' | 'radio-group';
  selectedDate?: Date;
  onChange: (value: Date | undefined) => void;
};

export const DatePickerPreset: FunctionComponent<DatePickerPresetProps> = ({
  variant,
  selectedDate,
  onChange,
}) => {
  const theme = useTheme();

  const dateToPreset = (date?: Date): DatePreset | undefined => {
    const day = dayjs(date);

    if (day.isSame(dayjs().startOf('day'), 'day')) {
      return DatePreset.Today;
    }

    if (day.isSame(dayjs().subtract(1, 'day').startOf('day'), 'day')) {
      return DatePreset.Yesterday;
    }

    return undefined;
  };

  const handleSelectPreset = (preset: DatePreset) => {
    let newValue = dayjs().startOf('day');

    switch (preset) {
      case DatePreset.Today: {
        break;
      }

      case DatePreset.Yesterday: {
        newValue = newValue.subtract(1, 'day');

        break;
      }

      default: {
        break;
      }
    }

    onChange(newValue.toDate());
  };

  if (variant === 'button-list') {
    return (
      <Box
        sx={{
          width: 150,
          display: 'flex',
          flexFlow: 'column',
          borderRight: '1px solid',
          borderColor: theme.palette.catskillWhite,
          [theme.breakpoints.down('md')]: {
            width: 1,
            borderRight: 'none',
          },
          '.MuiButtonBase-root': {
            textAlign: 'left',
            pl: 3,
            color: theme.palette.shark,
            width: 1,
            justifyContent: 'start',
            borderBottom: '1px solid',
            borderColor: theme.palette.catskillWhite,
            '&:hover': {
              color: theme.palette.blueberry,
            },
          },
        }}
      >
        {Object.entries(DatePreset).map(([key, presetValue]) => (
          <Button
            key={key}
            variant="text"
            onClick={() => handleSelectPreset(presetValue)}
            sx={{
              height: 40,
              textTransform: 'none',
              ':hover': {
                borderBottom: '1px solid',
                borderColor: theme.palette.catskillWhite,
              },
              [theme.breakpoints.down('md')]: {
                height: 48,
              },
            }}
          >
            {presetValue}
          </Button>
        ))}
      </Box>
    );
  }

  return (
    <RadioGroup
      value={dateToPreset(selectedDate)}
      onChange={(_, changedValue) => {
        handleSelectPreset(changedValue as DatePreset);
      }}
    >
      {Object.entries(DatePreset).map(([, preset]) => (
        <FormControlLabel
          key={preset}
          sx={{
            height: 54,
            px: 2,
            borderBottom: 'solid 1px',
            borderColor: theme.palette.blueHaze,
            flexFlow: 'row-reverse',
            justifyContent: 'space-between',
          }}
          control={<Radio />}
          value={preset}
          label={preset}
        />
      ))}
    </RadioGroup>
  );
};
