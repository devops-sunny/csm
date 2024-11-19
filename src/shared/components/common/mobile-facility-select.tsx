import { useEffect, useState, type FunctionComponent } from 'react';
import type { SxProps } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/system';

import { AnchorInput } from '@shared/components/common/anchor-input';
import { MobileDrawerSelect } from '@shared/components/common/mobile-drawer-select';
import { useRequestAllFacility } from '@shared/hooks/api/common/use-request-all-facility';

export type MobileFacilitySelectProps = {
  sx?: SxProps<Theme>;
  onChange?: (value: number) => void;
  value?: number;
};

export const MobileFacilitySelect: FunctionComponent<
  MobileFacilitySelectProps
> = ({ sx, onChange, value }) => {
  const [facilityId, setFacilityId] = useState<number>(value ?? 0);

  const theme = useTheme();

  const { data } = useRequestAllFacility();

  const facilities = data?.data;

  useEffect(() => {
    setFacilityId(value ?? 0);
  }, [value]);

  const handleChange = (newValue: number) => {
    setFacilityId(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <MobileDrawerSelect
      title="Select Location"
      options={
        facilities?.map((facility) => ({
          value: `${facility.id}`,
          label: facility.facilityName,
        })) ?? []
      }
      value={facilityId.toString()}
      onChange={(newValue) => handleChange(Number(newValue))}
      TriggerComponent={({ onOpen, selectedOption }) => (
        <AnchorInput
          placeholder="Select Location"
          onClick={onOpen}
          value={selectedOption?.label ?? ''}
          sx={{
            ...sx,
            display: 'none',
            [theme.breakpoints.down('md')]: {
              display: 'block',
            },
          }}
        />
      )}
    />
  );
};
