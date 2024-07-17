import { AuthorServerModel } from '@models/author';
import { Tooltip, Text } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { css } from 'styled-system/css';

export default function useEraColumnDef(): ColumnDef<
  AuthorServerModel,
  AuthorServerModel
> {
  return {
    id: 'era',
    header: 'Era',
    size: 190,
    accessorFn: row => row,
    cell: row => {
      const rowValue = row.getValue();

      return (
        <Tooltip
          content={
            <Text size="2">
              {rowValue.regions?.map(region => region.region).join(', ')}
            </Text>
          }
        >
          <Text className={css({ lineClamp: 2 })}>
            {rowValue.regions?.map(region => region.region).join(', ')}
          </Text>
        </Tooltip>
      );
    },
  };
}
