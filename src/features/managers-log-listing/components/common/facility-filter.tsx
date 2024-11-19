import { useAtomValue } from 'jotai';

import { queryParamsAtom } from '@features/managers-log-listing/states/filters';
import { AnchorInput } from '@shared/components/common/anchor-input';
import { SearchCheckbox } from '@shared/components/common/search-checkbox';
import { useRequestAllFacility } from '@shared/hooks/api/common/use-request-all-facility';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const FacilityFilter = () => {
  const queryParams = useAtomValue(queryParamsAtom);

  const {
    data: requestFacilitiesResponse,
    isLoading: requestFacilitiesLoading,
  } = useRequestAllFacility();

  const handleSelect = (facilityIds: number[]) => {
    defaultStore.set(queryParamsAtom, (prev) => {
      prev.filter.facilityIds = facilityIds;
    });
  };

  const facilities = requestFacilitiesResponse?.data;

  const facilitiesOptions = facilities?.map((facility) => ({
    value: facility.id?.toString() ?? '',
    label: facility.facilityName?.toString() ?? '',
  }));

  return (
    <SearchCheckbox
      hasCheckAll
      visibleOptions={5}
      options={facilitiesOptions}
      checkedOptions={queryParams.filter.facilityIds?.map((facilityId) =>
        facilityId.toString(),
      )}
      onSelect={(options) => {
        const selectedFacilityIds = options.map((option) =>
          Number(option.value),
        );

        handleSelect(selectedFacilityIds);
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
    />
  );
};
