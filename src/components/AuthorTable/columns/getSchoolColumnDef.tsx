import { AuthorServerModel } from '@models/author';
import { ColumnDef } from '@tanstack/react-table';

export default function getSchoolColumnDef(): ColumnDef<
  AuthorServerModel,
  AuthorServerModel
> {
  return {
    id: 'school',
    header: 'School',
    accessorFn: row => row,
    cell: row => {
      const rowValue = row.getValue();

      return rowValue.schools?.map(school => school.school).join(', ');
    },
  };
}
