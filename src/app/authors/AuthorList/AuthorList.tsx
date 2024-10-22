'use client';

import { HStack, HstackProps } from 'styled-system/jsx';
import { AxiosResponse } from 'axios';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { SearchAuthorsResponse, searchAuthors } from '@apis/author';
import { Fragment, useMemo } from 'react';
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
import { Media } from '@app/media';
import { css } from 'styled-system/css';

interface Props extends HstackProps {}

export default function AuthorList(props: Props) {
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
      <HStack flexWrap="wrap" width="1200px" px="10px" mt="128px" {...props}>
        {isLoading
          ? Array(24)
              .fill(0)
              .map((_, index) => <AuthorItemSkeleton key={index} />)
          : authors.map(author => (
              <Fragment key={author.id}>
                <Media greaterThanOrEqual="lg">
                  <AuthorItem author={author} />
                </Media>
                <Media lessThan="lg" className={css({ width: '100%' })}>
                  <AuthorItem
                    author={author}
                    width="100%"
                    padding="10px"
                    authorItemInnerProps={{ gap: '10px' }}
                  />
                </Media>
              </Fragment>
            ))}
      </HStack>
    </InfiniteScroll>
  );
}
