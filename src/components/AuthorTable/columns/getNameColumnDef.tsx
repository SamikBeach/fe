import { AuthorServerModel } from '@models/author';
import { Avatar, Text } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

export default function getNameColumnDef(): ColumnDef<
  AuthorServerModel,
  AuthorServerModel
> {
  return {
    id: 'name',
    header: 'Name',
    accessorFn: row => row,
    cell: row => {
      console.log({ row });
      const rowValue = row.getValue();

      return (
        <HStack>
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
