'use client';

import { HStack } from 'styled-system/jsx';
import { AxiosResponse } from 'axios';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { SearchAuthorsResponse, searchAuthors } from '@apis/author';
import { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { authorFilterAtom } from '@atoms/filter';
import { useAtomValue } from 'jotai';
import { authorSortAtom } from '@atoms/sort';
import { authorSearchKeywordAtom } from '@atoms/searchKeyword';
import {
  AuthorItemSkeleton,
  AuthorItem,
} from '../../../components/author/AuthorItem';
import { useLocale } from 'next-intl';

export default function AuthorList() {
  const locale = useLocale();

  const authorFilter = useAtomValue(authorFilterAtom);
  const authorSort = useAtomValue(authorSortAtom);
  const searchKeyword = useAtomValue(authorSearchKeywordAtom);

  const { data, fetchNextPage, isLoading } = useInfiniteQuery<
    AxiosResponse<SearchAuthorsResponse>
  >({
    queryKey: ['author/search', authorFilter.eraId, authorSort, searchKeyword],
    queryFn: async ({ pageParam = 1 }) => {
      return await searchAuthors({
        eraId: authorFilter.eraId,
        sort: authorSort,
        keyword: searchKeyword,
        page: pageParam as number,
        locale,
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
      <HStack flexWrap="wrap" width="1200px" px="10px" mt="128px">
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
