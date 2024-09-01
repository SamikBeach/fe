import { VStack } from 'styled-system/jsx';
import { searchOriginalWorks } from '@apis/original-work';
import { useQuery } from '@tanstack/react-query';
import {
  OriginalWorkItem,
  OriginalWorkItemSkeleton,
} from '@components/original_work/OriginalWorkItem';
import { useParams } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { authorOriginalWorkSortAtom } from '@atoms/sort';

export default function OriginalWorkList() {
  const authorOriginalWorkSort = useAtomValue(authorOriginalWorkSortAtom);

  const params = useParams();
  const authorId = Number(params.id);

  const { data: originalWorks = [], isLoading } = useQuery({
    queryKey: ['original-work', authorId, authorOriginalWorkSort],
    queryFn: () =>
      searchOriginalWorks({
        authorId,
        limit: 300,
        sort: authorOriginalWorkSort,
      }),
    select: data => data.data.data,
  });

  return (
    <VStack pb="40px">
      {isLoading
        ? Array(24)
            .fill(0)
            .map((_, index) => <OriginalWorkItemSkeleton key={index} />)
        : originalWorks.map(originalWork => (
            <OriginalWorkItem
              key={originalWork.id}
              originalWork={originalWork}
            />
          ))}
    </VStack>
  );
}
