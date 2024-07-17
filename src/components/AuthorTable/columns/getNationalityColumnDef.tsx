import { AuthorServerModel } from '@models/author';
import { ColumnDef } from '@tanstack/react-table';

export default function getNationalityColumnDef(): ColumnDef<AuthorServerModel> {
  return {
    id: 'nationality',
    header: 'Nationality',
    accessorFn: row => row.nationality?.nationality,
  };
}
