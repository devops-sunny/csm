'use client';

import { useEffect, useRef, useState } from 'react';
import type { FunctionComponent } from 'react';
import type { SxProps, Theme } from '@mui/material';
import {
  Box,
  Checkbox,
  Fade,
  FormControl,
  FormControlLabel,
  Paper,
  Popper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { useOnClickOutside } from 'usehooks-ts';

import { WithVirtualizeRowList } from '@shared/components/common/with-virtualize-row-list';

export type SearchCheckboxOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type TriggerComponent = (input: {
  selectedOptions: SearchCheckboxOption[];
  onOpen: (event: React.MouseEvent<HTMLElement>) => void;
}) => JSX.Element;

export type SearchCheckboxProps = {
  sx?: SxProps<Theme>;
  disabled?: boolean;
  hasCheckAll?: boolean;
  visibleOptions?: number;
  options?: SearchCheckboxOption[];
  defaultCheckedOptions?: SearchCheckboxOption['value'][];
  checkedOptions?: SearchCheckboxOption['value'][];
  onSelect?: (options: SearchCheckboxOption[]) => void;
  TriggerComponent?: TriggerComponent;
};

const OPTION_HEIGHT = 40;

export const SearchCheckbox: FunctionComponent<SearchCheckboxProps> = ({
  sx,
  disabled,
  hasCheckAll,
  options = [],
  visibleOptions = 5,
  defaultCheckedOptions = [],
  checkedOptions,
  onSelect,
  TriggerComponent,
}) => {
  const defaultOptions = defaultCheckedOptions.map((value) => {
    const matchedOption = options.find((option) => option.value === value);

    return matchedOption ?? { value, label: value };
  });

  const theme = useTheme();

  const [searchText, setSearchText] = useState('');

  const [selectedOptions, setSelectedOptions] = useState(defaultOptions);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const filteredOptions = (() => {
    const unselectedOptions = options.filter(
      ({ value }) => !selectedOptions.some((option) => option.value === value),
    );

    const reorderedOptions = [...selectedOptions, ...unselectedOptions];

    if (searchText) {
      return reorderedOptions.filter(({ label }) =>
        label.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    return reorderedOptions;
  })();

  const containerRef = useRef<HTMLElement>(null);

  const searchBarRef = useRef<HTMLElement>(null);

  useOnClickOutside(containerRef, () => {
    if (anchorEl) setAnchorEl(null);
  });

  useEffect(() => {
    const nextSelectedOptions = options.filter(({ value }) =>
      checkedOptions?.includes(value),
    );

    setSelectedOptions(nextSelectedOptions);
    /* eslint-disable-next-line react-hooks/exhaustive-deps --
      Intentionally ignore options cause infinite setState */
  }, [checkedOptions]);

  const handleCheck = (value: string, checked: boolean) => {
    let nextSelectedOptions = selectedOptions;

    if (checked) {
      const matchedOption = options.find(
        (selectedOption) => selectedOption.value === value,
      );

      if (!matchedOption) return;

      nextSelectedOptions = [...selectedOptions, matchedOption];
    } else {
      nextSelectedOptions = selectedOptions.filter(
        (selectedOption) => selectedOption.value !== value,
      );
    }

    setSelectedOptions(nextSelectedOptions);

    if (onSelect) {
      onSelect(nextSelectedOptions);
    }
  };

  const handleCheckAll = (checked: boolean) => {
    const nextSelectedOptions = checked ? options : [];

    setSelectedOptions(nextSelectedOptions);

    if (onSelect) {
      onSelect(nextSelectedOptions);
    }
  };

  const open = Boolean(anchorEl);

  const shouldFillParent = !TriggerComponent;

  let actualVisibleOptions = visibleOptions - (hasCheckAll ? 1 : 0);

  if (shouldFillParent) {
    const availableScrollHeight = (() => {
      const searchBarHeight = searchBarRef.current?.offsetHeight ?? 0;
      const containerHeight = containerRef.current?.offsetHeight ?? 0;

      const estimatedValue = containerHeight - searchBarHeight;

      if (estimatedValue > 0) return estimatedValue;

      return visibleOptions * OPTION_HEIGHT;
    })();

    const estimatedVisibleOptions =
      availableScrollHeight / OPTION_HEIGHT - (hasCheckAll ? 1 : 0);

    actualVisibleOptions =
      estimatedVisibleOptions < options.length
        ? estimatedVisibleOptions
        : options.length;
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: 1,
        ...(shouldFillParent && {
          height: 1,
        }),
      }}
    >
      {TriggerComponent &&
        TriggerComponent({
          selectedOptions,
          onOpen: (event) => setAnchorEl(anchorEl ? null : event.currentTarget),
        })}
      <Popper
        open={TriggerComponent ? open : true}
        anchorEl={TriggerComponent ? anchorEl : containerRef.current}
        sx={{
          width: 1,
          zIndex: 1000,
          ...(!TriggerComponent && {
            position: 'static !important',
            transform: 'none !important',
            height: 1,
          }),
        }}
        disablePortal
        keepMounted
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                height: 1,
                ...sx,
              }}
            >
              <Box
                ref={searchBarRef}
                sx={{
                  boxSizing: 'border-box',
                  px: 1.5,
                  py: 1,
                  background: theme.palette.catskillWhite,
                  ...(TriggerComponent && {
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                  }),
                }}
              >
                <FormControl
                  fullWidth
                  disabled={disabled}
                >
                  <TextField
                    placeholder="Search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </FormControl>
              </Box>
              {hasCheckAll && (
                <FormControl
                  disabled={disabled}
                  sx={{
                    height: OPTION_HEIGHT,
                    boxSizing: 'border-box',
                    px: 2,
                    py: 1.25,
                    borderBottom: '1px solid',
                    width: '100%',
                    borderColor: theme.palette.catskillWhite,
                  }}
                >
                  <FormControlLabel
                    onChange={(_event, checked) => handleCheckAll(checked)}
                    control={
                      <Checkbox
                        checked={selectedOptions.length === options.length}
                        indeterminate={
                          selectedOptions.length > 0 &&
                          selectedOptions.length < options.length
                        }
                      />
                    }
                    label="All"
                  />
                </FormControl>
              )}
              <WithVirtualizeRowList
                totalItems={filteredOptions.length}
                itemHeight={OPTION_HEIGHT}
                visibleItems={actualVisibleOptions}
              >
                {({ virtualItems }) =>
                  virtualItems.map((virtualRow) => {
                    const virtualIndex = virtualRow.index;
                    const lastSelectedOptionIndex = selectedOptions.length - 1;

                    const isCheckedAll =
                      lastSelectedOptionIndex === filteredOptions.length - 1;

                    const {
                      value,
                      disabled: disableItem,
                      label,
                    } = filteredOptions[virtualIndex];

                    return (
                      <FormControl
                        key={value}
                        disabled={disableItem ?? disabled}
                        sx={{
                          height: `${virtualRow.size}px`,
                          transform: `translateY(${virtualRow.start}px)`,
                          position: 'absolute',
                          width: '100%',
                          px: 2,
                          py: 1.25,
                          boxSizing: 'border-box',
                          borderBottom:
                            virtualIndex === lastSelectedOptionIndex &&
                            !isCheckedAll
                              ? `2px solid ${theme.palette.azure}`
                              : `1px solid ${theme.palette.catskillWhite}`,
                        }}
                      >
                        <FormControlLabel
                          onChange={(_event, checked) =>
                            handleCheck(value, checked)
                          }
                          sx={{}}
                          control={
                            <Checkbox
                              checked={selectedOptions.some(
                                ({ value: selectedValue }) =>
                                  selectedValue === value,
                              )}
                            />
                          }
                          label={<Typography noWrap>{label}</Typography>}
                        />
                      </FormControl>
                    );
                  })
                }
              </WithVirtualizeRowList>
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};
