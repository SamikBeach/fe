import { WritingServerModel } from '@models/writing';
import { Text } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { useMemo } from 'react';
import { css } from 'styled-system/css';

export default function useEditionsColumnDef() {
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
          <Link href={`/writing/${rowValue.id}`}>
            <Text
              className={css({
                cursor: 'pointer',
                _hover: { textDecoration: 'underline' },
              })}
            >
              {rowValue.books.length} editions
            </Text>
          </Link>
        );
      },
    };
  }, []);

  return column;
}
