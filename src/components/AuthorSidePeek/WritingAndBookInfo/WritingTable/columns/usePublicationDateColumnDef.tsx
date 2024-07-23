import { WritingServerModel } from '@models/writing';
import { Text } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useMemo } from 'react';
import ColumnHeader from '../ColumnHeader';
import { Sort, SortType } from '@models/sort';

interface Props {
  sort: Sort;
  setSort: Dispatch<SetStateAction<Sort>>;
}

export default function usePublicationDateColumnDef({ sort, setSort }: Props) {
  const column = useMemo<
    ColumnDef<WritingServerModel, WritingServerModel>
  >(() => {
    return {
      id: 'publicationDate',
      size: 120,
      accessorFn: row => row,
      header: () => (
        <ColumnHeader
          type={SortType.PublicationDate}
          sort={sort}
          setSort={setSort}
        />
      ),
      cell: row => {
        const rowValue = row.getValue();

        return (
          <Text>
            {rowValue.publication_date_is_bc === 1 ? 'BC' : ''}
            {rowValue.publication_date}
          </Text>
        );
      },
    };
  }, [setSort, sort]);

  return column;
}
