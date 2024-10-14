import { VStack, VstackProps } from 'styled-system/jsx';
import { searchOriginalWorks } from '@apis/original-work';
import { useQuery } from '@tanstack/react-query';
import {
  OriginalWorkItem,
  OriginalWorkItemSkeleton,
} from '@components/original-work/OriginalWorkItem';
import { useParams } from 'next/navigation';
import { useAtomValue } from 'jotai';
import { authorOriginalWorkSortAtom } from '@atoms/sort';
import { useLocale } from 'next-intl';

interface Props extends VstackProps {}

export default function OriginalWorkList(props: Props) {
  const locale = useLocale();

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
        locale,
      }),
    select: data => data.data.data,
  });

  return (
    <VStack pb="40px" {...props}>
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
