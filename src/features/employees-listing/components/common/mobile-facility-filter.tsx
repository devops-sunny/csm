import { useAtomValue } from 'jotai';

import { queryParamsAtom } from '@features/employees-listing/states/filters';
import { AnchorInput } from '@shared/components/common/anchor-input';
import { MobileDrawerCheckbox } from '@shared/components/common/mobile-drawer-checkbox';
import { useRequestAllFacility } from '@shared/hooks/api/common/use-request-all-facility';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const MobileFacilityFilter = () => {
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
    <MobileDrawerCheckbox
      hasCheckAll
      title="Select location"
      options={facilitiesOptions}
      checkedOptions={queryParams.filter.facilityIds?.map((facilityId) =>
        facilityId.toString(),
      )}
      onChange={(options) => {
        const selectedFacilityIds = options.map(Number);

        handleSelect(selectedFacilityIds);
      }}
      TriggerComponent={({ onOpen, checkedOptions }) => {
        let output = '';

        if (checkedOptions.length > 0) {
          output = `${checkedOptions[0].label}`;
        }

        if (checkedOptions.length > 1) {
          output = `${output} [+${checkedOptions.length - 1}]`;
        }

        if (checkedOptions.length === facilitiesOptions?.length) {
          output = 'All Facilities';
        }

        return (
          <AnchorInput
            onClick={onOpen}
            placeholder="Select Location"
            value={output}
            disabled={requestFacilitiesLoading}
          />
        );
      }}
    />
  );
};
