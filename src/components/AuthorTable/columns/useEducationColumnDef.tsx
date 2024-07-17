import { AuthorServerModel } from '@models/author';
import { ColumnDef } from '@tanstack/react-table';
import { Text, Tooltip } from '@radix-ui/themes';
import { css } from 'styled-system/css';

export default function useEducationColumnDef(): ColumnDef<
  AuthorServerModel,
  AuthorServerModel
> {
  return {
    id: 'education',
    header: 'Education',
    size: 200,
    accessorFn: row => row,
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
}
