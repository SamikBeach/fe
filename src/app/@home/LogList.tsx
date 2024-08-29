import { VStack } from 'styled-system/jsx';
import { SearchLogsResponse, searchLogs } from '@apis/log';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useMemo } from 'react';
import { LogItem } from './LogItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import LogItemSkeleton from './LogItem/LogItemSkeleton';

function LogList() {
  const { data, fetchNextPage, isLoading } = useInfiniteQuery<
    AxiosResponse<SearchLogsResponse>
  >({
    queryKey: ['log/search'],
    queryFn: async ({ pageParam = 0 }) => {
      return await searchLogs({
        where__id__less_than: pageParam as number,
        order__id: 'DESC',
        take: 20,
      });
    },
    // TODO: fix this
    initialPageParam: 999999999,
    getNextPageParam: param => {
      return param.data.cursor.after;
    },
    placeholderData: keepPreviousData,
  });

  const logs = useMemo(
    () => data?.pages?.flatMap(page => page.data.data) ?? [],
    [data]
  );

  if (isLoading) {
    return (
      <VStack gap="10px" pt="84px" py="30px" width="700px">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <LogItemSkeleton key={index} />
          ))}
      </VStack>
    );
  }

  return (
    <InfiniteScroll
      dataLength={logs.length}
      next={fetchNextPage}
      hasMore={true}
      loader={<></>}
    >
      <VStack gap="10px" pt="84px" py="30px" width="700px">
        {logs.map(log => (
          <LogItem key={log.id} log={log} />
        ))}
      </VStack>
    </InfiniteScroll>
  );
}

export default LogList;
