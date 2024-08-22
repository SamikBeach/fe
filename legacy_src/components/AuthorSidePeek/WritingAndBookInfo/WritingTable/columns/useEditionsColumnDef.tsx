import { WritingServerModel } from 'legacy_src/models/writing';
import { Text } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { css } from 'styled-system/css';

interface Props {
  setSelectedWritingId: Dispatch<SetStateAction<number | null>>;
}

export default function useEditionsColumnDef({ setSelectedWritingId }: Props) {
  const column = useMemo<
    ColumnDef<WritingServerModel, WritingServerModel>
  >(() => {
    return {
      id: 'editions',
      header: 'Editions',
      size: 100,
      accessorFn: row => row,
      cell: row => {
        const rowValue = row.getValue();

        return (
          <Text
            className={css({
              cursor: 'pointer',
              _hover: { textDecoration: 'underline' },
            })}
            onClick={() => setSelectedWritingId(rowValue.id)}
          >
            {rowValue.books.length} editions
          </Text>
        );
      },
    };
  }, [setSelectedWritingId]);

  return column;
}
