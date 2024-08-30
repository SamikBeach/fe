import { CategoryWrapper } from './styled-components';
import { HStack } from 'styled-system/jsx';

import { Text } from '@radix-ui/themes';
import { getUserLikes } from '@apis/user';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
  OriginalWorkItem,
  OriginalWorkItemSkeleton,
} from '@components/original_work/OriginalWorkItem';

export default function OriginalWorkLikeHistory() {
  const params = useParams();
  const userId = Number(params.id);

  const { data, isLoading } = useQuery({
    queryKey: ['user/like', userId],
    queryFn: () => getUserLikes({ userId }),
    select: response => response.data,
  });

  const originalWorks = data?.original_works ?? [];

  return (
    <CategoryWrapper>
      <Text size="2" weight="medium">
        Original works
      </Text>
      <HStack gap="6px" flexWrap="wrap">
        {isLoading
          ? Array(10)
              .fill(0)
              .map((_, index) => <OriginalWorkItemSkeleton key={index} />)
          : originalWorks.map(originalWork => (
              <OriginalWorkItem
                key={originalWork.id}
                originalWork={originalWork}
              />
            ))}
      </HStack>
    </CategoryWrapper>
  );
}
