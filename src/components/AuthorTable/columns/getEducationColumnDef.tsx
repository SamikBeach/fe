import { AuthorServerModel } from '@models/author';
import { ColumnDef } from '@tanstack/react-table';

export default function getEducationColumnDef(): ColumnDef<
  AuthorServerModel,
  AuthorServerModel
> {
  return {
    id: 'education',
    header: 'Education',
    accessorFn: row => row,
    cell: row => {
      const rowValue = row.getValue();

      return rowValue.educations
        ?.map(education => education.education)
        .join(', ');
    },
  };
}
