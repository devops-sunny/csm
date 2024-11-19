import { useEffect, type FunctionComponent } from 'react';
import { Box } from '@mui/material';
import { useInView } from 'react-intersection-observer';

import { LoadingIndicator } from '@shared/components/common/loading-indicator';

export type LoadMoreInViewProps = {
  hasMore: boolean;
  onNext: () => void;
  loading?: boolean;
  placeHolderHeight?: number;
};

export const LoadMoreInView: FunctionComponent<LoadMoreInViewProps> = ({
  hasMore,
  onNext,
  loading,
  placeHolderHeight = 64,
}) => {
  const { ref, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    if (inView && hasMore && !loading) {
      onNext();
    }
  }, [hasMore, inView, loading, onNext]);

  if (!hasMore) {
    return null;
  }

  return (
    <Box sx={{ position: 'relative', height: placeHolderHeight }}>
      {loading && <LoadingIndicator />}
      {!loading && !inView && <Box ref={ref} />}
    </Box>
  );
};
