'use client';

import type { FunctionComponent } from 'react';
import { useRef, useState } from 'react';
import { Box, Fade, Paper, Popper, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { DayPicker } from 'react-day-picker';
import { useOnClickOutside } from 'usehooks-ts';

import { DatePickerPreset } from '@shared/components/common/date-picker/date-picker-preset';
import { MonthYearSelect } from '@shared/components/common/month-year-select';

import 'react-day-picker/dist/style.css';

dayjs.extend(isoWeek);

const pastMonth = new Date();

const today = dayjs().toDate();

type TriggerComponentParams = {
  selectedValue: DatePickerProps['value'];
  clearValue: () => void;
  toggle: (event: React.MouseEvent<HTMLElement>) => void;
};

export type DatePickerProps = {
  value?: Date;
  defaultValue?: DatePickerProps['value'];
  popperZIndex?: number;
  onChange?: (value?: Date) => void;
  TriggerComponent?: (params: TriggerComponentParams) => JSX.Element;
};

export const DatePicker: FunctionComponent<DatePickerProps> = ({
  value,
  defaultValue,
  popperZIndex = 1400,
  onChange,
  TriggerComponent,
}) => {
  const isControlled = value !== undefined;

  const theme = useTheme();

  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [cellWidth, setCellWidth] = useState(0);

  const [displayMonthYear, setDisplayMonthYear] = useState<Date>(today);

  const containerRef = useRef<HTMLElement | null>(null);
  const popperRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside([containerRef, popperRef], (event) => {
    const targetElement = event.target as HTMLElement;

    const isClickedValidElement = [
      'month-selection',
      'year-selection',
    ].includes(targetElement.dataset.testid ?? '');

    if (isClickedValidElement) return;

    if (anchorEl) setAnchorEl(null);
  });

  const handleChange = (newValue?: DatePickerProps['value']) => {
    if (!isControlled) setUncontrolledValue(newValue);

    onChange?.(newValue);
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
              <Box
                sx={{
                  display: 'flex',
                  flexFlow: 'row',
                  [theme.breakpoints.down('md')]: {
                    flexFlow: 'column',
                  },
                }}
              >
                <DatePickerPreset
                  variant={TriggerComponent ? 'button-list' : 'radio-group'}
                  selectedDate={selectedValue}
                  onChange={(dateValue) => {
                    handleChange(dateValue);
                    setDisplayMonthYear(dateValue ?? today);
                  }}
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
                    },
                    today: {
                      border: '1px solid',
                      borderColor: theme.palette.blueberry,
                    },
                  }}
                  month={displayMonthYear}
                  disableNavigation
                  mode="single"
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
              </Box>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};
