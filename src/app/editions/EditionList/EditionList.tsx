'use client';

import { HStack, HstackProps } from 'styled-system/jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SearchEditionsResponse, searchEditions } from '@apis/edition';
import { useAtomValue } from 'jotai';
import { editionFilterAtom } from '@atoms/filter';
import { editionSortAtom } from '@atoms/sort';
import { editionSearchKeywordAtom } from '@atoms/searchKeyword';
import { AxiosResponse } from 'axios';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { Fragment, useMemo } from 'react';
import {
  EditionItem,
  EditionItemSkeleton,
} from '@components/edition/EditionItem';
import { Media } from '@app/media';
import { css } from 'styled-system/css';

interface Props extends HstackProps {}

export default function EditionList(props: Props) {
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
      <HStack flexWrap="wrap" width="1200px" px="10px" mt="128px" {...props}>
        {isLoading
          ? Array(24)
              .fill(0)
              .map((_, index) => (
                <Fragment key={index}>
                  <Media greaterThanOrEqual="lg">
                    <EditionItemSkeleton key={index} />
                  </Media>
                  <Media lessThan="lg" className={css({ width: '100%' })}>
                    <EditionItemSkeleton
                      key={index}
                      width="100%"
                      padding="10px"
                      gap="10px"
                    />
                  </Media>
                </Fragment>
              ))
          : editions.map(edition => (
              <Fragment key={edition.id}>
                <Media greaterThanOrEqual="lg">
                  <EditionItem edition={edition} />
                </Media>
                <Media lessThan="lg" className={css({ width: '100%' })}>
                  <EditionItem
                    edition={edition}
                    width="100%"
                    padding="10px"
                    editionItemInnerProps={{ gap: '10px', isMobile: true }}
                  />
                </Media>
              </Fragment>
            ))}
      </HStack>
    </InfiniteScroll>
  );
}
