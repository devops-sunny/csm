import { useRef } from 'react';
import type { ReactNode, FunctionComponent } from 'react';
import type { SxProps, Theme } from '@mui/material';
import { Box, Stack } from '@mui/material';
import type { VirtualItem } from '@tanstack/react-virtual';
import { useVirtualizer } from '@tanstack/react-virtual';

export type WithVirtualizeRowListProps = {
  sx?: SxProps<Theme>;
  totalItems: number;
  itemHeight: number;
  visibleItems: number;
  children: ({ virtualItems }: { virtualItems: VirtualItem[] }) => ReactNode;
};

export const WithVirtualizeRowList: FunctionComponent<
  WithVirtualizeRowListProps
> = ({ sx, totalItems, itemHeight, visibleItems, children }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: totalItems,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => itemHeight,
    overscan: 5,
  });

  return (
    <Box
      ref={scrollRef}
      sx={{
        height: itemHeight * visibleItems,
        boxSizing: 'border-box',
        overflowY: 'auto',
        ...sx,
      }}
    >
      <Stack
        direction="column"
        sx={{
          height: rowVirtualizer.getTotalSize(),
          position: 'relative',
        }}
      >
        {children({
          virtualItems: rowVirtualizer.getVirtualItems(),
        })}
      </Stack>
    </Box>
  );
};
