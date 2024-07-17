import { AuthorServerModel } from '@models/author';
import { ColumnDef } from '@tanstack/react-table';

export default function getRegionColumnDef(): ColumnDef<
  AuthorServerModel,
  AuthorServerModel
> {
  return {
    id: 'region',
    header: 'Region',
    accessorFn: row => row,
    cell: row => {
      const rowValue = row.getValue();

      return rowValue.regions?.map(region => region.region).join(', ');
    },
  };
}
