import { CategoryWrapper } from '../styled-components';
import { HStack } from 'styled-system/jsx';

import { Text } from '@radix-ui/themes';
import { getUserLikes } from '@apis/user';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
  OriginalWorkItem,
  OriginalWorkItemSkeleton,
} from '@components/original-work/OriginalWorkItem';
import { useTranslations } from 'next-intl';
import LikeHistoryEmpty from './LikeHistoryEmpty';

export default function OriginalWorkLikeHistory() {
  const t = useTranslations('Common');

  const params = useParams();
  const userId = Number(params.id);

  const { data, isLoading } = useQuery({
    queryKey: ['user/like', userId],
    queryFn: () => getUserLikes({ userId }),
    select: response => response.data,
    refetchOnMount: 'always',
  });

  const originalWorks = data?.original_works ?? [];
  const hasOriginalWorks = originalWorks.length > 0;

  return (
    <CategoryWrapper>
      <Text size="2" weight="medium">
        {t('original_works')}
      </Text>
      <HStack gap="6px" flexWrap="wrap">
        {isLoading ? (
          Array(10)
            .fill(0)
            .map((_, index) => <OriginalWorkItemSkeleton key={index} />)
        ) : hasOriginalWorks ? (
          originalWorks.map(originalWork => (
            <OriginalWorkItem
              key={originalWork.id}
              originalWork={originalWork}
            />
          ))
        ) : (
          <LikeHistoryEmpty type="original_work" />
        )}
      </HStack>
    </CategoryWrapper>
  );
}
