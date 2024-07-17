import { AuthorServerModel } from '@models/author';
import { ColumnDef } from '@tanstack/react-table';

export default function getEraColumnDef(): ColumnDef<
  AuthorServerModel,
  AuthorServerModel
> {
  return {
    id: 'era',
    header: 'Era',
    accessorFn: row => row,
    cell: row => {
      const rowValue = row.getValue();

      return rowValue.eras?.map(era => era.era).join(', ');
    },
  };
}
