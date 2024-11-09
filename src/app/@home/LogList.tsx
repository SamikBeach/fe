import { VStack } from 'styled-system/jsx';
import { SearchLogsResponse, searchLogs } from '@apis/log';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Fragment, useMemo } from 'react';
import { LogItem } from './LogItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import LogItemSkeleton from './LogItem/LogItemSkeleton';
import { Media } from '@app/media';
import { css } from 'styled-system/css';

function LogList() {
  const { data, fetchNextPage, isLoading } = useInfiniteQuery<
    AxiosResponse<SearchLogsResponse>
  >({
    queryKey: ['log/search'],
    queryFn: async ({ pageParam = 1 }) => {
      return await searchLogs({
        page: pageParam as number,
      });
    },
    initialPageParam: 1,
    getNextPageParam: param => {
      const nextParam = param.data.links.next;
      const query = nextParam?.split('?')[1];
      const pageParam = query
        ?.split('&')
        .find(q => q.startsWith('page'))
        ?.split('=')[1];

      return pageParam;
    },
    refetchOnMount: 'always',
    placeholderData: keepPreviousData,
  });

  const logs = useMemo(
    () => data?.pages?.flatMap(page => page.data.data) ?? [],
    [data]
  );

  if (isLoading) {
    return (
      <>
        <Media greaterThanOrEqual="lg">
          <VStack gap="10px" pt="84px" py="30px" minWidth="700px">
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <LogItemSkeleton key={index} />
              ))}
          </VStack>
        </Media>
        <Media lessThan="lg" className={css({ width: '100%' })}>
          <VStack gap="10px" pt="84px" py="30px" px="10px" width="100%">
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <LogItemSkeleton key={index} />
              ))}
          </VStack>
        </Media>
      </>
    );
  }

  return (
    <InfiniteScroll
      dataLength={logs.length}
      next={fetchNextPage}
      hasMore={true}
      loader={<></>}
    >
      <Media greaterThanOrEqual="lg">
        <VStack gap="10px" pt="84px" py="30px" width="700px">
          {logs.map(log => (
            <LogItem key={log.id} log={log} />
          ))}
        </VStack>
      </Media>
      <Media lessThan="lg">
        <VStack gap="10px" pt="84px" py="30px" width="100%" px="10px">
          {logs.map(log => (
            <LogItem key={log.id} log={log} />
          ))}
        </VStack>
      </Media>
    </InfiniteScroll>
  );
}

export default LogList;
