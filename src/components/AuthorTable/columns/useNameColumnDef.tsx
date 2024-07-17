import { AuthorServerModel } from '@models/author';
import { Avatar, Text } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

export default function useNameColumnDef(): ColumnDef<
  AuthorServerModel,
  AuthorServerModel
> {
  const router = useRouter();

  return {
    id: 'name',
    header: 'Name',
    accessorFn: row => row,
    size: 240,
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
}
