import { AuthorServerModel } from 'legacy_src/models/author';
import { ColumnDef } from '@tanstack/react-table';
import { Text, Tooltip } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { useMemo } from 'react';
import ColumnHeader from '../ColumnHeader';
import { SortType } from 'legacy_src/models/sort';

export default function useEducationColumnDef() {
  const column = useMemo<
    ColumnDef<AuthorServerModel, AuthorServerModel>
  >(() => {
    return {
      id: 'education',
      size: 200,
      accessorFn: row => row,
      header: () => <ColumnHeader type={SortType.Education} />,
      cell: row => {
        const rowValue = row.getValue();

        return (
          <Tooltip
            content={
              <Text size="2">
                {rowValue.educations
                  ?.map(education => education.education)
                  .join(', ')}
              </Text>
            }
          >
            <Text className={css({ lineClamp: 2 })}>
              {rowValue.educations
                ?.map(education => education.education)
                .join(', ')}
            </Text>
          </Tooltip>
        );
      },
    };
  }, []);

  return column;
}
