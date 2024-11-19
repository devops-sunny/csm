import { useRef, useState } from 'react';

import { useIsMobile } from '@shared/hooks/common/use-is-mobile';

type Input = Partial<{
  onPressed: () => void;
  timeout: number;
}>;

export const useLongPress = (
  { onPressed, timeout = 500 }: Input = {} as Input,
) => {
  const isMobile = useIsMobile();

  const [pressed, setPressed] = useState(false);

  const initiatedTimeStamp = useRef<number>();

  const timeoutId = useRef<NodeJS.Timeout>();

  const initiate = () => {
    if (!isMobile) return;

    initiatedTimeStamp.current = Date.now();

    timeoutId.current = setTimeout(() => {
      setPressed(true);

      onPressed?.();
    }, timeout);
  };

  const terminate = () => {
    if (!initiatedTimeStamp.current) return;

    const timeElapsed = Date.now() - initiatedTimeStamp.current;

    if (timeElapsed < timeout) {
      clearTimeout(timeoutId.current);
    }
  };

  return {
    pressed,
    release: () => setPressed(false),
    eventProps: {
      onTouchStart: initiate,
      onTouchEnd: terminate,
    },
  };
};
