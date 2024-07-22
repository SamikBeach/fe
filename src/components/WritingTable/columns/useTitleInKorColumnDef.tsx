import { WritingServerModel } from '@models/writing';
import { Text } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import ColumnHeader from '../ColumnHeader';
import { SortType } from '@models/sort';

export default function useTitleInKorColumnDef() {
  const column = useMemo<
    ColumnDef<WritingServerModel, WritingServerModel>
  >(() => {
    return {
      id: 'titleInKor',
      size: 200,
      accessorFn: row => row,
      header: () => <ColumnHeader type={SortType.TitleInKor} />,
      cell: row => {
        const rowValue = row.getValue();

        return <Text>{rowValue.title_in_kor}</Text>;
      },
    };
  }, []);

  return column;
}
