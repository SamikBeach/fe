import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { HeaderCell, HeaderRow, TBody, THead, Table } from './styledComponents';
import { SearchAuthorsResponse, searchAuthors } from '@apis/author';
import { useInfiniteQuery } from '@tanstack/react-query';
import { VStack } from 'styled-system/jsx';
import { Spinner } from '@radix-ui/themes';
import { useAtomValue } from 'jotai';
import { filterAtom } from '@atoms/filter';
import { css } from 'styled-system/css';
import { useColumnDefs } from './columns';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import MemoizedRow from './MemoizedRow';
import { AxiosResponse } from 'axios';

export default function AuthorTable() {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const selectedFilters = useAtomValue(filterAtom);

  const { data, fetchNextPage, isFetching, isLoading } = useInfiniteQuery<
    AxiosResponse<SearchAuthorsResponse>
  >({
    queryKey: ['author', selectedFilters],
    queryFn: async ({ pageParam = 0 }) => {
      return await searchAuthors({
        ...selectedFilters,
        where__id__more_than: pageParam as number,
        take: 30,
      });
    },
    initialPageParam: 0,
    getNextPageParam: param => {
      return param.data.cursor.after;
    },
    refetchOnWindowFocus: false,
    // placeholderData: keepPreviousData,
  });

  const flatData = useMemo(
    () => data?.pages?.flatMap(page => page.data.data) ?? [],
    [data]
  );

  const columnDefs = useColumnDefs();

  const table = useReactTable({
    state: {},
    columns: columnDefs,
    data: flatData,
    getCoreRowModel: getCoreRowModel(),
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 60, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? element => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

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
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  if (isLoading) {
    return (
      <VStack
        width="100%"
        height="calc(100vh - 64px)"
        justify="center"
        backgroundColor="white"
      >
        <Spinner size="3" />
      </VStack>
    );
  }

  return (
    <>
      <div
        onScroll={e => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
        ref={tableContainerRef}
        className={css({
          height: 'calc(100vh - 64px)',
          width: '100%',
          overflow: 'auto',

          '&::-webkit-scrollbar': {
            backgroundColor: '#f5f5f5',
            borderRadius: '10px',
            width: '8px',
            height: '8px',
          },

          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'gray.400',
            borderRadius: '10px',
          },
        })}
      >
        <Table
          style={{ width: table.getTotalSize(), backgroundColor: 'white' }}
        >
          <THead>
            {table.getHeaderGroups().map(headerGroup => (
              <HeaderRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <HeaderCell
                    key={header.id}
                    style={{
                      width: header.column.getSize(),
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </HeaderCell>
                ))}
              </HeaderRow>
            ))}
          </THead>
          <TBody
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map(virtualRow => {
              return (
                <MemoizedRow
                  key={virtualRow.index}
                  rows={rows}
                  virtualRow={virtualRow}
                  rowVirtualizer={rowVirtualizer}
                />
              );
            })}
          </TBody>
        </Table>
      </div>
    </>
  );
}
