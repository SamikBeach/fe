import { AuthorAvatar } from '@components/AuthorAvatar';
import { AuthorServerModel } from '@models/author';
import { ColumnDef } from '@tanstack/react-table';

export default function getInfluencedByColumnDef(): ColumnDef<
  AuthorServerModel,
  AuthorServerModel
> {
  return {
    id: 'influenced_by',
    header: 'Influenced by',
    accessorFn: row => row,
    cell: row => {
      const rowValue = row.getValue();

      return rowValue.influenced_bys?.map(influencedBy => (
        <AuthorAvatar key={influencedBy.id} author={influencedBy} />
      ));
    },
  };
}
