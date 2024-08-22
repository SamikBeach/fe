import { WritingServerModel } from 'legacy_src/models/writing';
import { Text } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import ColumnHeader from '../ColumnHeader';
import { SortType } from 'legacy_src/models/sort';

export default function usePublicationDateColumnDef() {
  const column = useMemo<
    ColumnDef<WritingServerModel, WritingServerModel>
  >(() => {
    return {
      id: 'publicationDate',
      size: 200,
      accessorFn: row => row,
      header: () => <ColumnHeader type={SortType.PublicationDate} />,
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
  }, []);

  return column;
}
