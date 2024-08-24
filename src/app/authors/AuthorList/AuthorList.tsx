'use client';

import { HStack } from 'styled-system/jsx';
import AuthorItem from './AuthorItem';
import { AxiosResponse } from 'axios';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { SearchAuthorsResponse, searchAuthors } from '@apis/author';
import { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { authorFilterAtom } from '@atoms/filter';
import { useAtomValue } from 'jotai';
import { authorSortAtom } from '@atoms/sort';
import { authorSearchKeywordAtom } from '@atoms/searchKeyword';
import AuthorItemSkeleton from './AuthorItemSkeleton';

export default function AuthorList() {
  const authorFilter = useAtomValue(authorFilterAtom);
  const authorSort = useAtomValue(authorSortAtom);
  const searchKeyword = useAtomValue(authorSearchKeywordAtom);

  const { data, fetchNextPage, isLoading } = useInfiniteQuery<
    AxiosResponse<SearchAuthorsResponse>
  >({
    queryKey: ['author/search', authorFilter.eraId, authorSort, searchKeyword],
    queryFn: async ({ pageParam = 0 }) => {
      return await searchAuthors({
        where__id__more_than: pageParam as number,
        take: 30,
        eraId: authorFilter.eraId,
        sort: authorSort,
        keyword: searchKeyword,
      });
    },
    initialPageParam: 0,
    getNextPageParam: param => {
      return param.data.cursor.after;
    },
    placeholderData: keepPreviousData,
  });

  const authors = useMemo(
    () => data?.pages?.flatMap(page => page.data.data) ?? [],
    [data]
  );

  console.log({ data, authors });

  return (
    <InfiniteScroll
      dataLength={authors.length}
      next={fetchNextPage}
      hasMore={true}
      loader={<></>}
    >
      <HStack flexWrap="wrap" width="1180px" mt="128px">
        {isLoading
          ? Array(24)
              .fill(0)
              .map((_, index) => <AuthorItemSkeleton key={index} />)
          : authors.map(author => (
              <AuthorItem key={author.id} author={author} />
            ))}
      </HStack>
    </InfiniteScroll>
  );
}
