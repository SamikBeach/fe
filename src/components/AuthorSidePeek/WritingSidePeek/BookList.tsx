import { Spinner } from '@radix-ui/themes';
import { useInfiniteQuery } from '@tanstack/react-query';
import { SearchBooksResponse, searchBooks } from '@apis/book';
import { VStack } from 'styled-system/jsx';
import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BookSidePeek } from '../BookSidePeek';
import { css } from 'styled-system/css';
import BookCard from './BookCard';

interface Props {
  writingId?: number;
}

export default function BookList({ writingId }: Props) {
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const listContainerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, fetchNextPage, isFetching } = useInfiniteQuery<
    AxiosResponse<SearchBooksResponse>
  >({
    queryKey: ['book', writingId],
    queryFn: async ({ pageParam = 0 }) => {
      return await searchBooks({
        where__id__more_than: pageParam as number,
        take: 10,
        writingIds: writingId !== undefined ? [writingId] : undefined,
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
    <>
      <VStack
        ref={listContainerRef}
        overflow="auto"
        height="calc(100vh - 180px)"
        width="100%"
        className={css({
          '&::-webkit-scrollbar': {
            backgroundColor: '#f5f5f5',
            borderRadius: '10px',
            width: '4px',
            height: '8px',
          },

          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'gray.300',
            borderRadius: '10px',
          },
        })}
        onScroll={e => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
      >
        {flatData.map(book => (
          <BookCard
            key={book.id}
            book={book}
            setSelectedBookId={setSelectedBookId}
          />
        ))}
      </VStack>
      <BookSidePeek
        bookId={selectedBookId ?? 0}
        open={selectedBookId !== null}
        onOpenChange={open => setSelectedBookId(open ? selectedBookId : null)}
      />
    </>
  );
}
