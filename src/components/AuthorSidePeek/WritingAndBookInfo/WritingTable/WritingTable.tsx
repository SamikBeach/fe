import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { HeaderCell, HeaderRow, TBody, THead, Table } from './styledComponents';
import { SearchWritingsResponse, searchWritings } from '@apis/writing';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { VStack } from 'styled-system/jsx';
import { Spinner } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { useColumnDefs } from './columns';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import MemoizedRow from './MemoizedRow';
import { AxiosResponse } from 'axios';
import { WritingSidePeek } from '@components/AuthorSidePeek/WritingSidePeek';
import { Sort } from '@models/sort';

interface Props {
  authorId?: number;
  selectedWritingId: number | null;
  setSelectedWritingId: Dispatch<SetStateAction<number | null>>;
}

export default function WritingTable({
  authorId,
  selectedWritingId,
  setSelectedWritingId,
}: Props) {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const [sort, setSort] = useState<Sort>([]);

  const { data, fetchNextPage, isFetching, isLoading } = useInfiniteQuery<
    AxiosResponse<SearchWritingsResponse>
  >({
    queryKey: ['writing', authorId, sort],
    queryFn: async ({ pageParam = 0 }) => {
      return await searchWritings({
        where__id__more_than: pageParam as number,
        take: 30,
        author: [{ id: authorId ?? 0, value: '' }],
        sort,
      });
    },
    initialPageParam: 0,
    getNextPageParam: param => {
      return param.data.cursor.after;
    },
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });

  const flatData = useMemo(
    () => data?.pages?.flatMap(page => page.data.data) ?? [],
    [data]
  );

  const columnDefs = useColumnDefs({ setSelectedWritingId, sort, setSort });

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
      <VStack height="calc(100vh - 140px)" width="100%" justify="center">
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
          height: 'calc(100vh - 180px)',
          width: '100%',
          minWidth: '100%',
          overflow: 'auto',

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
      >
        <Table
          style={{
            width: table.getTotalSize(),
            backgroundColor: 'white',
          }}
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
      <WritingSidePeek
        writingId={selectedWritingId ?? 0}
        open={selectedWritingId !== null}
        onOpenChange={open =>
          setSelectedWritingId(open ? selectedWritingId : null)
        }
      />
    </>
  );
}
