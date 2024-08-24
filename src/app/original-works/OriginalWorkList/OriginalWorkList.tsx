'use client';

import { HStack } from 'styled-system/jsx';
import OriginalWorkItem from './OriginalWorkItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  SearchOriginalWorksResponse,
  searchOriginalWorks,
} from '@apis/original_work';
import { useAtomValue } from 'jotai';
import { originalWorkFilterAtom } from '@atoms/filter';
import { originalWorkSortAtom } from '@atoms/sort';
import { originalWorkSearchKeywordAtom } from '@atoms/searchKeyword';
import { AxiosResponse } from 'axios';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import OriginalWorkItemSkeleton from './OriginalWorkItemSkeleton';

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
    queryFn: async ({ pageParam = 0 }) => {
      return await searchOriginalWorks({
        where__id__more_than: pageParam as number,
        take: 30,
        authorId: originalWorkFilter.authorId,
        sort: originalWorkSort,
        keyword: searchKeyword,
      });
    },
    initialPageParam: 0,
    getNextPageParam: param => {
      return param.data.cursor.after;
    },
    placeholderData: keepPreviousData,
  });

  console.log({ data });

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
