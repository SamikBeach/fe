import { AuthorServerModel } from '@models/author';
import { SortType } from '@models/sort';
import { Tooltip, Text } from '@radix-ui/themes';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { css } from 'styled-system/css';
import ColumnHeader from '../ColumnHeader';

export default function useSchoolColumnDef() {
  const column = useMemo<
    ColumnDef<AuthorServerModel, AuthorServerModel>
  >(() => {
    return {
      id: 'school',
      accessorFn: row => row,
      size: 200,
      header: () => <ColumnHeader type={SortType.School} />,
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
