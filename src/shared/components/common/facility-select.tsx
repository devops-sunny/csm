import type { FunctionComponent } from 'react';
import { useEffect, useState } from 'react';
import type { SelectChangeEvent, BaseSelectProps } from '@mui/material';
import { Select, MenuItem } from '@mui/material';

import { useRequestAllFacility } from '@shared/hooks/api/common/use-request-all-facility';

export type FacilitySelectProps = Omit<
  BaseSelectProps,
  'value' | 'onChange'
> & {
  onChange?: (value: number) => void;
  value?: number;
};

export const FacilitySelect: FunctionComponent<FacilitySelectProps> = ({
  onChange,
  value,
  placeholder = 'Select Location',
  ...selectProps
}) => {
  const [facilityId, setFacilityId] = useState<number>(value ?? 0);

  const { data } = useRequestAllFacility();

  const facilities = data?.data;

  useEffect(() => {
    setFacilityId(value ?? 0);
  }, [value]);

  const handleChange = (event: SelectChangeEvent<number>) => {
    const newValue = event.target.value as number;

    setFacilityId(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Select
      {...selectProps}
      value={facilityId}
      onChange={handleChange}
      defaultValue={0}
    >
      <MenuItem
        disabled
        value={0}
      >
        {placeholder}
      </MenuItem>
      {facilities?.map((facility) => (
        <MenuItem
          key={facility.id}
          value={Number(facility.id)}
        >
          {facility.facilityName}
        </MenuItem>
      ))}
    </Select>
  );
};
