import { VStack } from 'styled-system/jsx';
import { searchOriginalWorks } from '@apis/original-work';
import { useQuery } from '@tanstack/react-query';
import {
  OriginalWorkItem,
  OriginalWorkItemSkeleton,
} from '@components/original_work/OriginalWorkItem';
import { useParams } from 'next/navigation';

export default function OriginalWorkList() {
  const params = useParams();
  const authorId = Number(params.id);

  const { data: originalWorks = [], isLoading } = useQuery({
    queryKey: ['original-work', authorId],
    queryFn: () => searchOriginalWorks({ authorId }),
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
