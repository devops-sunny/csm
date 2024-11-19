import { useEffect, useState, type FunctionComponent } from 'react';

import { AnchorInput } from '@shared/components/common/anchor-input';
import type { MobileDrawerCheckboxProps } from '@shared/components/common/mobile-drawer-checkbox';
import { MobileDrawerCheckbox } from '@shared/components/common/mobile-drawer-checkbox';
import { useRequestAllFacility } from '@shared/hooks/api/common/use-request-all-facility';

export type MobileFacilitiesSelectProps = {
  title?: string;
  selectedIds: number[];
  onSelect: (facilityIds: number[]) => void;
  onLoadedFacilities?: (facilityIds: number[]) => void;
  TriggerComponent?: MobileDrawerCheckboxProps['TriggerComponent'];
};

export const MobileFacilitiesSelect: FunctionComponent<
  MobileFacilitiesSelectProps
> = ({
  title,
  selectedIds = [],
  onSelect,
  onLoadedFacilities,
  TriggerComponent,
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

  const defaultTriggerComponent: MobileDrawerCheckboxProps['TriggerComponent'] =
    ({ onOpen, checkedOptions }) => {
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
          fullWidth
          placeholder="Select Location"
          value={output}
          disabled={requestFacilitiesLoading}
          onClick={requestFacilitiesLoading ? () => {} : onOpen}
        />
      );
    };

  return (
    <MobileDrawerCheckbox
      title={title ?? 'Select Location'}
      hasCheckAll
      options={facilitiesOptions}
      checkedOptions={selectedIds.map((id) => id.toString())}
      onChange={(options) => {
        const selectedFacilityIds = options.map(Number);

        onSelect(selectedFacilityIds);
      }}
      TriggerComponent={TriggerComponent ?? defaultTriggerComponent}
    />
  );
};
