import { VStack } from 'styled-system/jsx';
import { useAtomValue } from 'jotai';
import { originalWorkEditionSortAtom } from '@atoms/sort';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { searchEditions } from '@apis/edition';
import {
  EditionItem,
  EditionItemSkeleton,
} from '@components/edition/EditionItem';

export default function EditonList() {
  const originalWorkEditionSort = useAtomValue(originalWorkEditionSortAtom);

  const params = useParams();
  const originalWorkId = Number(params.id);

  const { data: editions = [], isLoading } = useQuery({
    queryKey: ['edition', originalWorkId, originalWorkEditionSort],
    queryFn: () =>
      searchEditions({
        originalWorkId,
        limit: 500,
        sort: originalWorkEditionSort,
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
