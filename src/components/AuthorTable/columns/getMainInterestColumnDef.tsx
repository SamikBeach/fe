import { AuthorServerModel } from '@models/author';
import { ColumnDef } from '@tanstack/react-table';

export default function getMainInterestColumnDef(): ColumnDef<
  AuthorServerModel,
  AuthorServerModel
> {
  return {
    id: 'main_interest',
    header: 'Main interest',
    accessorFn: row => row,
    cell: row => {
      const rowValue = row.getValue();

      return rowValue.main_interests
        ?.map(mainInterest => mainInterest.main_interest)
        .join(', ');
    },
  };
}
