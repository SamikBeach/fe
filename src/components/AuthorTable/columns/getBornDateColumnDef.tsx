import { AuthorServerModel } from '@models/author';
import { ColumnDef } from '@tanstack/react-table';

export default function getBornDateColumnDef(): ColumnDef<AuthorServerModel> {
  return {
    id: 'bornDate',
    header: 'Born date',
    accessorFn: row => row.born_date,
  };
}
