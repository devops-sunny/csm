'use client';

import type { FunctionComponent } from 'react';
import { useRef, useState } from 'react';
import { Box, Fade, Paper, Popper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import type { DateRange } from 'react-day-picker';
import { DayPicker } from 'react-day-picker';
import { useOnClickOutside } from 'usehooks-ts';

import { RangePreset } from '@shared/components/common/date-range-picker/range-preset';
import { MonthYearSelect } from '@shared/components/common/month-year-select';

import 'react-day-picker/dist/style.css';

dayjs.extend(isoWeek);

const pastMonth = new Date();

const today = dayjs().toDate();

type TriggerComponentParams = {
  selectedValue: DateRangePickerProps['value'];
  clearValue: () => void;
  toggle: (event: React.MouseEvent<HTMLElement>) => void;
};

export type DateRangePickerProps = {
  value?: DateRange;
  defaultValue?: DateRangePickerProps['value'];
  popperZIndex?: number;
  onChange?: (selected: DateRange) => void;
  TriggerComponent?: (params: TriggerComponentParams) => JSX.Element;
};

export const DateRangePicker: FunctionComponent<DateRangePickerProps> = ({
  value,
  defaultValue,
  popperZIndex = 1400,
  onChange,
  TriggerComponent,
}) => {
  const isControlled = value !== undefined;

  const theme = useTheme();

  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [cellWidth, setCellWidth] = useState(0);

  const [displayMonthYear, setDisplayMonthYear] = useState(today);

  const containerRef = useRef<HTMLElement | null>(null);
  const popperRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside([containerRef, popperRef], (event) => {
    const targetElement = event.target as HTMLElement;

    const isClickingValidElement = [
      'month-selection',
      'year-selection',
    ].includes(targetElement.dataset.testid ?? '');

    if (isClickingValidElement) return;

    if (anchorEl) setAnchorEl(null);
  });

  const handleChange = (newRange?: DateRangePickerProps['value']) => {
    if (!isControlled) setUncontrolledValue(newRange);

    if (onChange) {
      const isSingleDate = Boolean(newRange?.from) && !newRange?.to;

      onChange({
        from: newRange?.from,
        to: isSingleDate ? newRange?.from : newRange?.to,
      });
    }

    setDisplayMonthYear(newRange?.from ?? today);
  };

  const handleChangeDisplayMonthYear = (date: Date) => {
    setDisplayMonthYear(date);
  };

  const handleToggle: TriggerComponentParams['toggle'] = (event) =>
    setAnchorEl(anchorEl ? null : event.currentTarget);

  const selectedValue = isControlled ? value : uncontrolledValue;

  return (
    <Box
      ref={(node: HTMLElement | null) => {
        containerRef.current = node;

        const containerWidth = node?.getBoundingClientRect().width ?? 0;

        if (containerWidth !== 0) {
          const newCellWidth = (containerWidth - 32) / 7;

          setCellWidth(newCellWidth);
        }
      }}
      sx={{
        position: 'relative',
        width: 1,
        ...(!TriggerComponent && {
          height: 1,
        }),
      }}
    >
      {TriggerComponent?.({
        selectedValue,
        toggle: handleToggle,
        clearValue: () => handleChange(),
      })}
      <Popper
        open={TriggerComponent ? Boolean(anchorEl) : true}
        anchorEl={TriggerComponent ? anchorEl : containerRef.current}
        sx={{
          zIndex: popperZIndex,
          ...(!TriggerComponent && {
            position: 'static !important',
            transform: 'none !important',
            width: 1,
            height: 1,
          }),
        }}
        disablePortal={!TriggerComponent}
        keepMounted
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper
              ref={popperRef}
              sx={{
                display: 'flex',
                flexFlow: TriggerComponent ? 'row' : 'column',
                backgroundColor: theme.palette.white,
                minHeight: 1,
                ...(!TriggerComponent && {
                  '& .rdp': {
                    '--rdp-cell-size': `${cellWidth}px`,

                    '& table:before': {
                      content: '""',
                      position: 'absolute',
                      inset: 0,
                      border: `1px solid ${theme.palette.blueHaze}`,
                      borderRadius: '5px',
                    },
                  },
                }),
                [theme.breakpoints.down('md')]: {
                  flexFlow: 'column',
                },
              }}
            >
              <RangePreset
                variant={TriggerComponent ? 'button-list' : 'radio-group'}
                dateRange={selectedValue}
                handleChange={handleChange}
              />
              <DayPicker
                styles={{
                  root: {
                    margin: TriggerComponent ? '16px 32px' : '55px auto',
                  },
                  table: {
                    position: 'relative',
                  },
                }}
                modifiersStyles={{
                  selected: {
                    backgroundColor: theme.palette.blueberry,
                    height: 28,
                  },
                  today: {
                    border: '1px solid',
                    borderColor: theme.palette.blueberry,
                  },
                  range_start: {
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                  },
                  range_end: {
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                  },
                }}
                month={displayMonthYear}
                disableNavigation
                mode="range"
                defaultMonth={pastMonth}
                selected={selectedValue}
                onSelect={handleChange}
                showOutsideDays
                weekStartsOn={1}
                components={{
                  CaptionLabel: () => (
                    <MonthYearSelect
                      value={displayMonthYear}
                      onChange={handleChangeDisplayMonthYear}
                      dropdownZIndex={popperZIndex + 100}
                    />
                  ),
                }}
              />
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};
