import { VStack, VstackProps } from 'styled-system/jsx';
import { useAtomValue } from 'jotai';
import { editionEditionSortAtom } from '@atoms/sort';
import { searchEditions } from '@apis/edition';
import {
  EditionItem,
  EditionItemSkeleton,
} from '@components/edition/EditionItem';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

interface Props extends VstackProps {}

export default function EditonList(props: Props) {
  const editionEditionSort = useAtomValue(editionEditionSortAtom);

  const params = useParams();
  const editionId = Number(params.id);

  const { data: editions = [], isLoading } = useQuery({
    queryKey: ['edition', editionId, editionEditionSort],
    queryFn: () =>
      searchEditions({
        editionId,
        limit: 500,
        sort: editionEditionSort,
      }),
    select: data => data.data.data,
  });

  return (
    <VStack pb="40px" {...props}>
      {isLoading
        ? Array(24)
            .fill(0)
            .map((_, index) => <EditionItemSkeleton key={index} />)
        : editions
            .filter(edition => edition.id !== editionId)
            .map(edition => <EditionItem key={edition.id} edition={edition} />)}
    </VStack>
  );
}
