import { AuthorServerModel } from '@models/author';
import { Tooltip, Text } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { capitalize } from 'lodash';
import { css } from 'styled-system/css';

export default function useMainInterestColumnDef(): ColumnDef<
  AuthorServerModel,
  AuthorServerModel
> {
  return {
    id: 'main_interest',
    header: 'Main interest',
    size: 200,
    accessorFn: row => row,
    cell: row => {
      const rowValue = row.getValue();

      return (
        <Tooltip
          content={
            <Text size="2">
              {rowValue.main_interests
                ?.map(mainInterest => capitalize(mainInterest.main_interest))
                .join(', ')}
            </Text>
          }
        >
          <Text className={css({ lineClamp: 2 })}>
            {rowValue.main_interests
              ?.map(mainInterest => capitalize(mainInterest.main_interest))
              .join(', ')}
          </Text>
        </Tooltip>
      );
    },
  };
}
