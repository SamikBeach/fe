import { AuthorAvatar } from '@components/AuthorAvatar';
import { AuthorServerModel } from '@models/author';
import { ColumnDef } from '@tanstack/react-table';

export default function getInfluencedColumnDef(): ColumnDef<
  AuthorServerModel,
  AuthorServerModel
> {
  return {
    id: 'influenced',
    header: 'Influenced',
    accessorFn: row => row,
    cell: row => {
      const rowValue = row.getValue();

      return rowValue.influenceds?.map(influenced => (
        <AuthorAvatar key={influenced.id} author={influenced} />
      ));
    },
  };
}
