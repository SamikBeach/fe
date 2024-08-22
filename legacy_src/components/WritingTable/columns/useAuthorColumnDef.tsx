import { WritingServerModel } from 'legacy_src/models/writing';
import { Avatar, Text } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { useMemo } from 'react';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';
import ColumnHeader from '../ColumnHeader';
import { SortType } from 'legacy_src/models/sort';

export default function useAuthorColumnDef() {
  const column = useMemo<
    ColumnDef<WritingServerModel, WritingServerModel>
  >(() => {
    return {
      id: 'author',
      size: 310,
      accessorFn: row => row,
      header: () => <ColumnHeader type={SortType.Author} />,
      cell: row => {
        const rowValue = row.getValue();

        return (
          <HStack>
            <Avatar
              size="2"
              radius="full"
              src={rowValue.author.image_url ?? undefined}
              fallback={rowValue.author.name[0]}
            />
            <VStack alignItems="start" gap="0px">
              <Link href={`/author/${rowValue.author.id}`}>
                <Text
                  weight="bold"
                  className={css({
                    cursor: 'pointer',
                    _hover: { textDecoration: 'underline' },
                  })}
                >
                  {rowValue.author.name}
                </Text>
              </Link>
              <Link href={`/author/${rowValue.author.id}`}>
                <Text
                  className={css({
                    fontSize: '13px',
                    cursor: 'pointer',
                    _hover: { textDecoration: 'underline' },
                  })}
                >
                  {rowValue.author.name_in_kor}
                </Text>
              </Link>
            </VStack>
          </HStack>
        );
      },
    };
  }, []);

  return column;
}
