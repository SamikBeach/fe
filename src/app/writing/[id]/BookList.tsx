import { SearchBooksResponse, searchBooks } from '@apis/book';
import { BookCard } from '@components/BookCard';
import { Spinner } from '@radix-ui/themes';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { VStack } from 'styled-system/jsx';

interface Props {
  writingId: number;
}

function BookList({ writingId }: Props) {
  const listContainerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, fetchNextPage, isFetching } = useInfiniteQuery<
    AxiosResponse<SearchBooksResponse>
  >({
    queryKey: ['book', writingId],
    queryFn: async ({ pageParam = 0 }) => {
      return await searchBooks({
        // ...selectedFilters,
        where__id__more_than: pageParam as number,
        take: 10,
        writingId,
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
        if (scrollHeight - scrollTop - clientHeight < 500 && !isFetching) {
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
      px="40px"
      py="20px"
      // height="calc(100vh - 64px)"
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
