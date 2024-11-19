import { useEffect, useState, type FunctionComponent } from 'react';

import { AnchorInput } from '@shared/components/common/anchor-input';
import type { SearchCheckboxProps } from '@shared/components/common/search-checkbox';
import { SearchCheckbox } from '@shared/components/common/search-checkbox';
import { useRequestAllFacility } from '@shared/hooks/api/common/use-request-all-facility';

export type FacilitiesSelectProps = {
  selectedIds: number[];
  onSelect: (facilityIds: number[]) => void;
  onLoadedFacilities?: (facilityIds: number[]) => void;
} & Omit<
  SearchCheckboxProps,
  'checkedOptions' | 'onSelect' | 'TriggerComponent'
>;

export const FacilitiesSelect: FunctionComponent<FacilitiesSelectProps> = ({
  selectedIds,
  onSelect,
  onLoadedFacilities,
  ...searchCheckboxProps
}) => {
  const [loaded, setLoaded] = useState(false);

  const {
    data: requestFacilitiesResponse,
    isLoading: requestFacilitiesLoading,
  } = useRequestAllFacility();

  const facilities = requestFacilitiesResponse?.data;

  const facilitiesOptions = facilities?.map((facility) => ({
    value: facility.id?.toString() ?? '',
    label: facility.facilityName?.toString() ?? '',
  }));

  useEffect(() => {
    if (requestFacilitiesResponse && !loaded) {
      const facilitiesIds = (facilities?.map((facility) => facility.id) ??
        []) as number[];

      setLoaded(true);

      if (onLoadedFacilities) {
        onLoadedFacilities(facilitiesIds);
      }
    }
  }, [facilities, loaded, onLoadedFacilities, requestFacilitiesResponse]);

  return (
    <SearchCheckbox
      hasCheckAll
      visibleOptions={5}
      options={facilitiesOptions}
      checkedOptions={selectedIds.map((id) => id.toString())}
      onSelect={(options) => {
        const selectedFacilityIds = options.map((option) =>
          Number(option.value),
        );

        onSelect(selectedFacilityIds);
      }}
      TriggerComponent={({ selectedOptions, onOpen }) => {
        let output = '';

        if (selectedOptions.length > 0) {
          output = `${selectedOptions[0].label}`;
        }

        if (selectedOptions.length > 1) {
          output = `${output} [+${selectedOptions.length - 1}]`;
        }

        if (selectedOptions.length === facilitiesOptions?.length) {
          output = 'All Facilities';
        }

        return (
          <AnchorInput
            fullWidth
            placeholder="Select Location"
            value={output}
            disabled={requestFacilitiesLoading}
            onClick={requestFacilitiesLoading ? () => {} : onOpen}
          />
        );
      }}
      {...searchCheckboxProps}
    />
  );
};
