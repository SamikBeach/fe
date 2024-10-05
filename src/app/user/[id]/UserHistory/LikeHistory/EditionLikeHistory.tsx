import { CategoryWrapper } from '../styled-components';
import { HStack } from 'styled-system/jsx';
import { Text } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';
import { getUserLikes } from '@apis/user';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
  EditionItem,
  EditionItemSkeleton,
} from '@components/edition/EditionItem';
import LikeHistoryEmpty from './LikeHistoryEmpty';

export default function EditionLikeHistory() {
  const t = useTranslations('Common');

  const params = useParams();
  const userId = Number(params.id);

  const { data, isLoading } = useQuery({
    queryKey: ['user/like', userId],
    queryFn: () => getUserLikes({ userId }),
    select: response => response.data,
    refetchOnMount: 'always',
  });

  const editions = data?.editions ?? [];
  const hasEditions = editions.length > 0;

  return (
    <CategoryWrapper>
      <Text size="2" weight="medium">
        {t('editions')}
      </Text>
      <HStack gap="6px" flexWrap="wrap">
        {isLoading ? (
          Array(10)
            .fill(0)
            .map((_, index) => <EditionItemSkeleton key={index} />)
        ) : hasEditions ? (
          editions.map(edition => (
            <EditionItem key={edition.id} edition={edition} />
          ))
        ) : (
          <LikeHistoryEmpty type="edition" />
        )}
      </HStack>
    </CategoryWrapper>
  );
}
