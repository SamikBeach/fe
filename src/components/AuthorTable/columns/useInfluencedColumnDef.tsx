import { Tooltip, Text } from '@radix-ui/themes';
import { AuthorServerModel } from '@models/author';
import { ColumnDef } from '@tanstack/react-table';
import { css } from 'styled-system/css';

export default function useInfluencedColumnDef(): ColumnDef<
  AuthorServerModel,
  AuthorServerModel
> {
  return {
    id: 'influenced',
    header: 'Influenced',
    size: 400,
    accessorFn: row => row,
    cell: row => {
      const rowValue = row.getValue();

      return (
        <Tooltip
          content={
            <Text size="2">
              {rowValue.influenceds
                ?.map(influenced => influenced.name)
                .join(', ')}
            </Text>
          }
        >
          <Text className={css({ lineClamp: 2 })}>
            {rowValue.influenceds
              ?.map(influenced => influenced.name)
              .join(', ')}
          </Text>
        </Tooltip>
      );
    },
  };
}
