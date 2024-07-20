import { AuthorServerModel } from '@models/author';
import { Avatar, Text } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';
import ColumnHeader from '../ColumnHeader';
import { SortType } from '@models/sort';

export default function useNameColumnDef() {
  const router = useRouter();

  const column = useMemo<
    ColumnDef<AuthorServerModel, AuthorServerModel>
  >(() => {
    return {
      id: 'name',
      header: () => <ColumnHeader type={SortType.Name} />,
      accessorFn: row => row,
      size: 300,
      cell: row => {
        const rowValue = row.getValue();

        return (
          <HStack onClick={() => router.push(`/author/${rowValue.id}`)}>
            <Avatar
              size="2"
              radius="full"
              src={rowValue.image_url ?? undefined}
              fallback={rowValue.name[0]}
            />
            <VStack alignItems="start" gap="0px">
              <Text weight="bold">{rowValue.name}</Text>
              <Text className={css({ fontSize: '13px' })}>
                {rowValue.name_in_kor}
              </Text>
            </VStack>
          </HStack>
        );
      },
    };
  }, [router]);

  return column;
}
