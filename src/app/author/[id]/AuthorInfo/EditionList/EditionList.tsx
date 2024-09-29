import { VStack } from 'styled-system/jsx';
import EditionItem from './EditionItem';
import { searchEditions } from '@apis/edition';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { authorEditionSortAtom } from '@atoms/sort';
import { EditionItemSkeleton } from '@components/edition/EditionItem';

export default function EditonList() {
  const authorOriginalWorkSort = useAtomValue(authorEditionSortAtom);

  const params = useParams();
  const authorId = Number(params.id);

  const { data: editions = [], isLoading } = useQuery({
    queryKey: ['edition', authorId, authorOriginalWorkSort],
    queryFn: () =>
      searchEditions({
        authorId,
        limit: 500,
        sort: authorOriginalWorkSort,
      }),
    select: data => data.data.data,
  });

  return (
    <VStack pb="40px">
      {isLoading
        ? Array(24)
            .fill(0)
            .map((_, index) => <EditionItemSkeleton key={index} />)
        : editions.map(edition => (
            <EditionItem key={edition.id} edition={edition} />
          ))}
    </VStack>
  );
}
