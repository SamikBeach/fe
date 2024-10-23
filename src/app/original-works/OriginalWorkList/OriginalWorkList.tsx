'use client';

import { HStack, HstackProps } from 'styled-system/jsx';
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
import { Fragment, useMemo } from 'react';
import {
  OriginalWorkItem,
  OriginalWorkItemSkeleton,
} from '@components/original-work/OriginalWorkItem';
import { useLocale } from 'next-intl';
import { Media } from '@app/media';
import { css } from 'styled-system/css';

interface Props extends HstackProps {}

export default function OriginalWorkList(props: Props) {
  const locale = useLocale();

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
      <HStack flexWrap="wrap" width="1200px" px="10px" mt="128px" {...props}>
        {isLoading
          ? Array(10)
              .fill(0)
              .map((_, index) => (
                <Fragment key={index}>
                  <Media greaterThanOrEqual="lg">
                    <OriginalWorkItemSkeleton key={index} />
                  </Media>
                  <Media lessThan="lg" className={css({ width: '100%' })}>
                    <OriginalWorkItemSkeleton
                      key={index}
                      width="100%"
                      padding="10px"
                      gap="10px"
                    />
                  </Media>
                </Fragment>
              ))
          : originalWorks.map(originalWork => (
              <Fragment key={originalWork.id}>
                <Media greaterThanOrEqual="lg">
                  <OriginalWorkItem originalWork={originalWork} />
                </Media>
                <Media lessThan="lg" className={css({ width: '100%' })}>
                  <OriginalWorkItem
                    originalWork={originalWork}
                    width="100%"
                    padding="10px"
                    originalWorkItemInnerProps={{
                      gap: '10px',
                      isMobile: true,
                    }}
                  />
                </Media>
              </Fragment>
            ))}
      </HStack>
    </InfiniteScroll>
  );
}
