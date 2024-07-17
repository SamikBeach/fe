import { AuthorServerModel } from '@models/author';
import { ColumnDef } from '@tanstack/react-table';

export default function useNationalityColumnDef(): ColumnDef<AuthorServerModel> {
  return {
    id: 'nationality',
    header: 'Nationality',
    size: 140,
    accessorFn: row => row.nationality?.nationality,
  };
}
