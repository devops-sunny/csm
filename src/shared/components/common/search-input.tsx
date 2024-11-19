import { useState, useEffect } from 'react';
import type { FunctionComponent, ChangeEvent } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';

import ClearTextIcon from '@assets/icons/common/clear-text.svg';
import { useDebounce } from '@shared/hooks/common/use-debounce';
import { theme } from '@shared/libs/mui/theme';

export type SearchInputProps = {
  value?: string | null;
  onChange?: (value: string) => void;
};

export const SearchInput: FunctionComponent<SearchInputProps> = ({
  value,
  onChange,
}) => {
  const [searchText, setSearchText] = useState('');

  const debounce = useDebounce();

  useEffect(() => {
    setSearchText(value ?? '');
  }, [value]);

  const handleChangeSearchQuery = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: newValue } = event.target;

    setSearchText(newValue);

    debounce(() => {
      onChange?.(newValue);
    }, 300);
  };

  const handleClearSearchQuery = () => {
    setSearchText('');

    onChange?.('');
  };

  return (
    <TextField
      value={searchText}
      placeholder="Search"
      onChange={handleChangeSearchQuery}
      InputProps={{
        endAdornment: (
          <InputAdornment
            position="end"
            sx={{
              mr: 1,
              color: theme.palette.azure,
              display: searchText ? 'flex' : 'none',
            }}
          >
            <IconButton
              size="icon-only"
              sx={{ color: theme.palette.salmonPearl }}
              onClick={handleClearSearchQuery}
            >
              <ClearTextIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
