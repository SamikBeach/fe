import { AuthorServerModel } from 'legacy_src/models/author';
import { Tooltip, Text } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { css } from 'styled-system/css';
import ColumnHeader from '../ColumnHeader';
import { SortType } from 'legacy_src/models/sort';

export default function useRegionColumnDef() {
  const column = useMemo<
    ColumnDef<AuthorServerModel, AuthorServerModel>
  >(() => {
    return {
      id: 'region',
      accessorFn: row => row,
      size: 160,
      header: () => <ColumnHeader type={SortType.Region} />,
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
  }, []);

  return column;
}
