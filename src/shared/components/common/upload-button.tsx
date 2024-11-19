import type { FunctionComponent, PropsWithChildren } from 'react';
import { useRef } from 'react';
import type { LoadingButtonProps } from '@mui/lab/LoadingButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { TextField } from '@mui/material';

export type UploadButtonProps = PropsWithChildren &
  LoadingButtonProps & {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    multiple?: boolean;
    accept?: string;
  };

export const UploadButton: FunctionComponent<UploadButtonProps> = ({
  children,
  onChange,
  multiple = false,
  accept,
  ...loadingButtonProps
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerUploadFile = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <LoadingButton
      onClick={triggerUploadFile}
      {...loadingButtonProps}
    >
      {children}
      <TextField
        sx={{ display: 'none' }}
        type="file"
        inputRef={fileInputRef}
        onChange={handleChange}
        inputProps={{
          multiple,
          accept,
        }}
      />
    </LoadingButton>
  );
};
