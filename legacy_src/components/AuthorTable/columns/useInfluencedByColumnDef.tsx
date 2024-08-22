import { AuthorServerModel } from 'legacy_src/models/author';
import { Tooltip, Text } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { css } from 'styled-system/css';

export default function useInfluencedByColumnDef() {
  const column = useMemo<
    ColumnDef<AuthorServerModel, AuthorServerModel>
  >(() => {
    return {
      id: 'influenced_by',
      header: 'Influenced by',
      size: 400,
      accessorFn: row => row,
      cell: row => {
        const rowValue = row.getValue();

        return (
          <Tooltip
            content={
              <Text size="2">
                {rowValue.influenced_bys
                  ?.map(influencedBy => influencedBy.name)
                  .join(', ')}
              </Text>
            }
          >
            <Text className={css({ lineClamp: 2 })}>
              {rowValue.influenced_bys
                ?.map(influencedBy => influencedBy.name)
                .join(', ')}
            </Text>
          </Tooltip>
        );
      },
    };
  }, []);

  return column;
}
