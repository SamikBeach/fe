import { AuthorServerModel } from '@models/author';
import { ColumnDef } from '@tanstack/react-table';
import { getBornDateText } from '@utils/author';

export default function getDiedDateColumnDef(): ColumnDef<
  AuthorServerModel,
  AuthorServerModel
> {
  return {
    id: 'diedDate',
    header: 'Died date',
    accessorFn: row => row,
    cell: row =>
      getBornDateText({
        bornDate: row.getValue().died_date,
        bornDateIsBc: row.getValue().died_date_is_bc === 1,
      }),
  };
}
