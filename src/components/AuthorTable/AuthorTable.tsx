import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Cell,
  HeaderCell,
  HeaderRow,
  Row,
  TBody,
  THead,
  Table,
} from './styledComponents';
import { searchAuthors } from '@apis/author';
import { useQuery } from '@tanstack/react-query';
import { VStack } from 'styled-system/jsx';
import { Spinner } from '@radix-ui/themes';
import { useAtomValue } from 'jotai';
import { filterAtom } from '@atoms/filter';
import { columns } from './columns';

export default function AuthorTable() {
  const selectedFilters = useAtomValue(filterAtom);

  const { data: authors = [], isLoading } = useQuery({
    queryKey: ['author', selectedFilters],
    queryFn: () =>
      searchAuthors({
        ...selectedFilters,
        take: 50,
      }),
    select: response => response.data.data,
    placeholderData: prev => prev,
  });

  const table = useReactTable({
    state: {},
    columns: columns,
    data: authors,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <VStack height="calc(100vh - 128px)" justify="center">
        <Spinner size="3" />
      </VStack>
    );
  }

  return (
    <Table>
      <THead>
        {table.getHeaderGroups().map(headerGroup => (
          <HeaderRow key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <HeaderCell key={header.id}>
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
      <TBody>
        {table.getRowModel().rows.map(row => (
          <Row key={row.id}>
            {row.getVisibleCells().map(cell => (
              <Cell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Cell>
            ))}
          </Row>
        ))}
      </TBody>
    </Table>
  );
}
