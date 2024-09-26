'use client';

import { HStack } from 'styled-system/jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  SearchOriginalWorksResponse,
  searchOriginalWorks,
} from '@apis/original-work';
import { useAtomValue } from 'jotai';
import { originalWorkFilterAtom } from '@atoms/filter';
import { originalWorkSortAtom } from '@atoms/sort';
import { originalWorkSearchKeywordAtom } from '@atoms/searchKeyword';
import { AxiosResponse } from 'axios';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
  OriginalWorkItem,
  OriginalWorkItemSkeleton,
} from '@components/original-work/OriginalWorkItem';

export default function OriginalWorkList() {
  const originalWorkFilter = useAtomValue(originalWorkFilterAtom);
  const originalWorkSort = useAtomValue(originalWorkSortAtom);
  const searchKeyword = useAtomValue(originalWorkSearchKeywordAtom);

  const { data, fetchNextPage, isLoading } = useInfiniteQuery<
    AxiosResponse<SearchOriginalWorksResponse>
  >({
    queryKey: [
      'original-work/search',
      originalWorkFilter.authorId,
      originalWorkSort,
      searchKeyword,
    ],
    queryFn: async ({ pageParam = 1 }) => {
      return await searchOriginalWorks({
        authorId: originalWorkFilter.authorId,
        sort: originalWorkSort,
        keyword: searchKeyword,
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

  const originalWorks = useMemo(
    () => data?.pages?.flatMap(page => page.data.data) ?? [],
    [data]
  );

  return (
    <InfiniteScroll
      dataLength={originalWorks.length}
      next={fetchNextPage}
      hasMore={true}
      loader={<></>}
    >
      <HStack flexWrap="wrap" width="1200px" px="10px" mt="128px">
        {isLoading
          ? Array(24)
              .fill(0)
              .map((_, index) => <OriginalWorkItemSkeleton key={index} />)
          : originalWorks.map(originalWork => (
              <OriginalWorkItem
                key={originalWork.id}
                originalWork={originalWork}
              />
            ))}
      </HStack>
    </InfiniteScroll>
  );
}
