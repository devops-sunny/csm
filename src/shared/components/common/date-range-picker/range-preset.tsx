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
import type { DateRange } from 'react-day-picker';

export enum PresetValue {
  Today = 'Today',
  Yesterday = 'Yesterday',
  ThisWeek = 'This Week',
  LastWeek = 'Last Week',
  ThisMonth = 'This Month',
  LastMonth = 'Last Month',
}

type RangePresetProps = {
  variant: 'button-list' | 'radio-group';
  dateRange: DateRange | undefined;
  handleChange: (nextRange: { from: Date; to: Date }) => void;
};

export const RangePreset: FunctionComponent<RangePresetProps> = ({
  variant,
  dateRange,
  handleChange,
}) => {
  const theme = useTheme();

  const rangeToPreset = (range?: DateRange): PresetValue | null => {
    if (!range) return null;

    const from = dayjs(range.from);
    const to = dayjs(range.to);

    if (
      from.isSame(dayjs().startOf('day'), 'day') &&
      to.isSame(dayjs().endOf('day'), 'day')
    ) {
      return PresetValue.Today;
    }

    if (
      from.isSame(dayjs().subtract(1, 'day').startOf('day'), 'day') &&
      to.isSame(dayjs().subtract(1, 'day').endOf('day'), 'day')
    ) {
      return PresetValue.Yesterday;
    }

    if (
      from.isSame(dayjs().isoWeekday(1).startOf('day'), 'day') &&
      to.isSame(dayjs().isoWeekday(7).endOf('day'), 'day')
    ) {
      return PresetValue.ThisWeek;
    }

    if (
      from.isSame(
        dayjs().subtract(1, 'week').isoWeekday(1).startOf('day'),
        'day',
      ) &&
      to.isSame(dayjs().subtract(1, 'week').isoWeekday(7).endOf('day'), 'day')
    ) {
      return PresetValue.LastWeek;
    }

    if (
      from.isSame(dayjs().startOf('month').startOf('day'), 'day') &&
      to.isSame(dayjs().endOf('month').endOf('day'), 'day')
    ) {
      return PresetValue.ThisMonth;
    }

    if (
      from.isSame(
        dayjs().subtract(1, 'month').startOf('month').startOf('day'),
        'day',
      ) &&
      to.isSame(dayjs().subtract(1, 'month').endOf('month').endOf('day'), 'day')
    ) {
      return PresetValue.LastMonth;
    }

    return null;
  };

  const handleSetRangePreset = (preset: PresetValue) => {
    let from = dayjs().startOf('day');
    let to = dayjs().endOf('day');

    switch (preset) {
      case PresetValue.Today: {
        break;
      }

      case PresetValue.Yesterday: {
        from = from.subtract(1, 'day');
        to = to.subtract(1, 'day');

        break;
      }

      case PresetValue.ThisWeek: {
        from = from.isoWeekday(1);
        to = to.isoWeekday(7);

        break;
      }

      case PresetValue.LastWeek: {
        from = from.subtract(1, 'week').isoWeekday(1);
        to = to.subtract(1, 'week').isoWeekday(7);

        break;
      }

      case PresetValue.ThisMonth: {
        from = from.startOf('month');
        to = to.endOf('month');

        break;
      }

      case PresetValue.LastMonth: {
        from = from.subtract(1, 'months').startOf('month');
        to = to.subtract(1, 'months').endOf('month');

        break;
      }

      default: {
        break;
      }
    }

    handleChange({ from: from.toDate(), to: to.toDate() });
  };

  if (variant === 'button-list') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column',
          borderRight: '1px solid',
          borderColor: theme.palette.catskillWhite,
          minWidth: 150,
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
          [theme.breakpoints.down('md')]: {
            width: 1,
            borderRight: 'none',
          },
        }}
      >
        {Object.entries(PresetValue).map(([key, value]) => (
          <Button
            key={key}
            variant="text"
            onClick={() => handleSetRangePreset(value)}
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
            {value}
          </Button>
        ))}
      </Box>
    );
  }

  return (
    <RadioGroup
      value={rangeToPreset(dateRange)}
      onChange={(_, changedValue) => {
        handleSetRangePreset(changedValue as PresetValue);
      }}
    >
      {Object.entries(PresetValue).map(([, preset]) => (
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
