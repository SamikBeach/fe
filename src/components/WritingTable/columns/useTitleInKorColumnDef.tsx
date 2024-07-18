import { WritingServerModel } from '@models/writing';
import { Text } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

export default function useTitleInKorColumnDef() {
  const column = useMemo<
    ColumnDef<WritingServerModel, WritingServerModel>
  >(() => {
    return {
      id: 'titleInKor',
      header: 'Korean title',
      size: 200,
      accessorFn: row => row,
      cell: row => {
        const rowValue = row.getValue();

        return <Text>{rowValue.title_in_kor}</Text>;
      },
    };
  }, []);

  return column;
}
