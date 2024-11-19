import { useRef } from 'react';
import type { PropsWithChildren, FunctionComponent } from 'react';
import type { SxProps, Theme } from '@mui/material';
import { ButtonBase } from '@mui/material';
import { useOnClickOutside } from 'usehooks-ts';

import { useIsMobile } from '@shared/hooks/common/use-is-mobile';
import { useLongPress } from '@shared/hooks/common/use-long-press';

export type LongPressListenerProps = {
  sx?: SxProps<Theme>;
  onChange?: (pressed: boolean) => void;
  children:
    | ((props: { pressed: boolean }) => React.ReactNode)
    | PropsWithChildren['children'];
};

export const LongPressListener: FunctionComponent<LongPressListenerProps> = ({
  sx,
  children,
  onChange,
}) => {
  const isMobile = useIsMobile();

  const { eventProps, pressed, release } = useLongPress({
    onPressed: () => onChange?.(true),
  });

  const containerRef = useRef<HTMLButtonElement | null>(null);

  useOnClickOutside([containerRef], () => {
    release();
    onChange?.(false);
  });

  return (
    <ButtonBase
      ref={containerRef}
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
      disableRipple={!isMobile || pressed}
      {...eventProps}
    >
      {typeof children === 'function' ? children({ pressed }) : children}
    </ButtonBase>
  );
};
