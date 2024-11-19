import { useState } from 'react';
import type { FunctionComponent } from 'react';
import { Button } from '@mui/material';

import { MobileFullScreenDrawer } from '@shared/components/common/mobile-full-screen-drawer';
import { SearchCheckbox } from '@shared/components/common/search-checkbox';

type MobileDrawerCheckboxOption = {
  value: string;
  label: string;
};

type TriggerComponent = (input: {
  checkedOptions: MobileDrawerCheckboxOption[];
  onOpen: (event: React.MouseEvent<HTMLElement>) => void;
}) => JSX.Element;

export type MobileDrawerCheckboxProps = {
  title?: string;
  options?: MobileDrawerCheckboxOption[];
  checkedOptions?: MobileDrawerCheckboxOption['value'][];
  hasCheckAll?: boolean;
  disabled?: boolean;
  onChange?: (values: MobileDrawerCheckboxOption['value'][]) => void;
  TriggerComponent: TriggerComponent;
};

export const MobileDrawerCheckbox: FunctionComponent<
  MobileDrawerCheckboxProps
> = ({
  title,
  options = [],
  checkedOptions,
  hasCheckAll,
  disabled,
  onChange,
  TriggerComponent,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <MobileFullScreenDrawer
        open={open}
        title={title}
        onOpen={handleOpen}
        onClose={handleClose}
        footerActions={
          <Button
            sx={{ width: 155 }}
            onClick={handleClose}
          >
            Close
          </Button>
        }
      >
        <SearchCheckbox
          hasCheckAll={hasCheckAll}
          sx={{
            borderRadius: 0,
          }}
          disabled={disabled}
          options={options.map((option) => ({
            value: option.value,
            label: option.label,
          }))}
          checkedOptions={checkedOptions}
          onSelect={(selectedOptions) => {
            const selectedIds = selectedOptions.map((option) => option.value);

            if (onChange) onChange(selectedIds);
          }}
        />
      </MobileFullScreenDrawer>
      {TriggerComponent({
        checkedOptions: options.filter((option) =>
          checkedOptions?.includes(option.value),
        ),
        onOpen: handleOpen,
      })}
    </>
  );
};
