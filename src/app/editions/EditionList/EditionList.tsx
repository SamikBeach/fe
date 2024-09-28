'use client';

import { HStack } from 'styled-system/jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SearchEditionsResponse, searchEditions } from '@apis/edition';
import { useAtomValue } from 'jotai';
import { editionFilterAtom } from '@atoms/filter';
import { editionSortAtom } from '@atoms/sort';
import { editionSearchKeywordAtom } from '@atoms/searchKeyword';
import { AxiosResponse } from 'axios';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
  EditionItem,
  EditionItemSkeleton,
} from '@components/edition/EditionItem';

export default function EditionList() {
  const editionFilter = useAtomValue(editionFilterAtom);
  const editionSort = useAtomValue(editionSortAtom);
  const searchKeyword = useAtomValue(editionSearchKeywordAtom);

  const { data, fetchNextPage, isLoading } = useInfiniteQuery<
    AxiosResponse<SearchEditionsResponse>
  >({
    queryKey: [
      'edition/search',
      editionFilter.authorId,
      editionSort,
      searchKeyword,
    ],
    queryFn: async ({ pageParam = 1 }) => {
      return await searchEditions({
        authorId: editionFilter.authorId,
        sort: editionSort,
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

  const editions = useMemo(
    () => data?.pages?.flatMap(page => page.data.data) ?? [],
    [data]
  );

  return (
    <InfiniteScroll
      dataLength={editions.length}
      next={fetchNextPage}
      hasMore={true}
      loader={<></>}
    >
      <HStack flexWrap="wrap" width="1200px" px="10px" mt="128px">
        {isLoading
          ? Array(24)
              .fill(0)
              .map((_, index) => <EditionItemSkeleton key={index} />)
          : editions.map(edition => (
              <EditionItem key={edition.id} edition={edition} />
            ))}
      </HStack>
    </InfiniteScroll>
  );
}
