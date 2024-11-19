import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useAtomValue } from 'jotai';

import { managerLogListingApi } from '@features/managers-log-listing/api/manager-log-listing-api';
import { RowGroup } from '@features/managers-log-listing/components/listings/row-group';
import { queryParamsAtom } from '@features/managers-log-listing/states/filters';
import { groupLogBySortType } from '@features/managers-log-listing/utils/group-log-by-date';
import { EmptyDataRows } from '@shared/components/common/empty-data-rows';
import { LoadMoreInView } from '@shared/components/common/load-more-in-view';
import { LoadingIndicator } from '@shared/components/common/loading-indicator';
import { API_CACHE_KEY } from '@shared/constants/api-cache-key';
import { useRequestAllFacility } from '@shared/hooks/api/common/use-request-all-facility';
import { useInfinitePagination } from '@shared/hooks/api/core/use-infinite-pagination';
import { defaultStore } from '@shared/libs/jotai/default-store';

export const RowGroups = () => {
  const queryParams = useAtomValue(queryParamsAtom);

  const { data: facilitiesData } = useRequestAllFacility();

  const { data, isFetchingMore, loadMore, isLoading } = useInfinitePagination(
    [API_CACHE_KEY.GET_MANAGER_LOG_LIST, queryParams],
    (page) =>
      managerLogListingApi.getLogs({
        ...queryParams,
        metadata: {
          ...queryParams.metadata,
          page,
        },
      }),
    {
      parallel: true,
    },
  );

  useEffect(() => {
    if (facilitiesData?.data) {
      defaultStore.set(queryParamsAtom, (prev) => ({
        ...prev,
        filter: {
          ...prev.filter,
          facilityIds: facilitiesData.data.map((facility) => facility.id),
        },
      }));
    }
  }, [facilitiesData?.data]);

  const allLogs = data ? data.flatMap((i) => i.data.nodes) : [];

  const groupedLog = groupLogBySortType(allLogs);

  const isEmpty = data?.[0].data.nodes.length === 0;

  const hasMore = (() => {
    const totalNodes =
      data?.reduce((acc, curr) => acc + curr.data.nodes.length, 0) ?? 0;

    return totalNodes < (data?.[0].data.metadata.totalDocs ?? 0);
  })();

  if (!data && isLoading) {
    return <LoadingIndicator />;
  }

  if (!isLoading && isEmpty) {
    return <EmptyDataRows />;
  }

  return (
    <>
      {Object.entries(groupedLog).map(([label, logItems]) => {
        if (!logItems) {
          return null;
        }

        return (
          <Box key={label}>
            <RowGroup
              groupLabel={label}
              logs={logItems}
            />
          </Box>
        );
      })}
      <LoadMoreInView
        hasMore={hasMore}
        onNext={loadMore}
        loading={isFetchingMore}
      />
    </>
  );
};
