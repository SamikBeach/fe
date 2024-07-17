import { AuthorServerModel } from '@models/author';
import { Tooltip, Text } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { css } from 'styled-system/css';

export default function useRegionColumnDef(): ColumnDef<
  AuthorServerModel,
  AuthorServerModel
> {
  return {
    id: 'region',
    header: 'Region',
    accessorFn: row => row,
    size: 160,
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
