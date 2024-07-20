import { AuthorServerModel } from '@models/author';
import { Tooltip, Text } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { css } from 'styled-system/css';
import ColumnHeader from '../ColumnHeader';
import { SortType } from '@models/sort';

export default function useEraColumnDef() {
  const column = useMemo<
    ColumnDef<AuthorServerModel, AuthorServerModel>
  >(() => {
    return {
      id: 'era',
      size: 190,
      accessorFn: row => row,
      header: () => <ColumnHeader type={SortType.Era} />,
      cell: row => {
        const rowValue = row.getValue();

        return (
          <Tooltip
            content={
              <Text size="2">
                {rowValue.eras?.map(era => era.era).join(', ')}
              </Text>
            }
          >
            <Text className={css({ lineClamp: 2 })}>
              {rowValue.eras?.map(era => era.era).join(', ')}
            </Text>
          </Tooltip>
        );
      },
    };
  }, []);

  return column;
}
