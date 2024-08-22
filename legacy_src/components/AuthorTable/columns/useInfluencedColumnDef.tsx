import { Tooltip, Text } from '@radix-ui/themes';
import { AuthorServerModel } from 'legacy_src/models/author';
import { ColumnDef } from '@tanstack/react-table';
import { css } from 'styled-system/css';
import { useMemo } from 'react';

export default function useInfluencedColumnDef() {
  const column = useMemo<
    ColumnDef<AuthorServerModel, AuthorServerModel>
  >(() => {
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
  }, []);

  return column;
}
