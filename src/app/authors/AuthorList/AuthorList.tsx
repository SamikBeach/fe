'use client';

import { HStack } from 'styled-system/jsx';
import AuthorItem from './AuthorItem';
import { AxiosResponse } from 'axios';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { SearchAuthorsResponse, searchAuthors } from '@apis/author';
import { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function AuthorList() {
  const { data, fetchNextPage } = useInfiniteQuery<
    AxiosResponse<SearchAuthorsResponse>
  >({
    queryKey: ['author/search'],
    queryFn: async ({ pageParam = 0 }) => {
      return await searchAuthors({
        where__id__more_than: pageParam as number,
        take: 30,
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

  return (
    <InfiniteScroll
      dataLength={authors.length}
      next={fetchNextPage}
      hasMore={true}
      loader={<></>}
    >
      <HStack flexWrap="wrap" width="1180px" mt="128px">
        {authors.map(author => (
          <AuthorItem key={author.id} author={author} />
        ))}
      </HStack>
    </InfiniteScroll>
  );
}