import { AuthorServerModel } from '@models/author';
import { Tooltip, Text } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { capitalize } from 'lodash';
import { useMemo } from 'react';
import { css } from 'styled-system/css';
import ColumnHeader from '../ColumnHeader';
import { SortType } from '@models/sort';

export default function useMainInterestColumnDef() {
  const column = useMemo<
    ColumnDef<AuthorServerModel, AuthorServerModel>
  >(() => {
    return {
      id: 'main_interest',
      size: 200,
      accessorFn: row => row,
      header: () => <ColumnHeader type={SortType.MainInterest} />,
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
  }, []);

  return column;
}
