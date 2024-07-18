import { WritingServerModel } from '@models/writing';
import { Text } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

export default function usePublicationDateColumnDef() {
  const column = useMemo<
    ColumnDef<WritingServerModel, WritingServerModel>
  >(() => {
    return {
      id: 'publicationDate',
      header: 'Publication date',
      size: 200,
      accessorFn: row => row,
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
