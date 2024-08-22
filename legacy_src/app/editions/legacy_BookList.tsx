import { SearchBooksResponse, searchBooks } from 'legacy_src/apis/book';
import { filterAtom } from 'legacy_src/atoms/filter';
import { BookCard } from 'legacy_src/components/BookCard';
import { Spinner } from '@radix-ui/themes';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useAtomValue } from 'jotai';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { VStack } from 'styled-system/jsx';

function BookList() {
  const listContainerRef = useRef<HTMLDivElement>(null);

  const selectedFilters = useAtomValue(filterAtom);

  const { data, isLoading, fetchNextPage, isFetching } = useInfiniteQuery<
    AxiosResponse<SearchBooksResponse>
  >({
    queryKey: ['book', selectedFilters],
    queryFn: async ({ pageParam = 0 }) => {
      return await searchBooks({
        ...selectedFilters,
        where__id__more_than: pageParam as number,
        take: 10,
      });
    },
    initialPageParam: 0,
    getNextPageParam: param => {
      return param.data.cursor.after;
    },
    refetchOnWindowFocus: false,
  });

  const flatData = useMemo(
    () => data?.pages?.flatMap(page => page.data.data) ?? [],
    [data]
  );

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        //once the user has scrolled within 500px of the bottom of the table, fetch more data if we can
        if (scrollHeight - scrollTop - clientHeight < 100 && !isFetching) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching]
  );

  useEffect(() => {
    fetchMoreOnBottomReached(listContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  if (isLoading) {
    return (
      <VStack height="calc(100vh - 64px)" width="100%" justify="center">
        <Spinner size="3" />
      </VStack>
    );
  }

  return (
    <VStack
      ref={listContainerRef}
      gap="20px"
      px="40px"
      py="20px"
      height="calc(100vh - 64px)"
      width="100%"
      minWidth="600px"
      overflow="auto"
      onScroll={e => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
    >
      {flatData.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </VStack>
  );
}

export default BookList;
