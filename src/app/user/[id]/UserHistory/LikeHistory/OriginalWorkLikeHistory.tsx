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
import { Fragment } from 'react';
import { Media } from '@app/media';
import { css } from 'styled-system/css';

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
            .map((_, index) => (
              <Fragment key={index}>
                <Media greaterThanOrEqual="lg">
                  <OriginalWorkItemSkeleton key={index} />
                </Media>
                <Media lessThan="lg" className={css({ width: '100%' })}>
                  <OriginalWorkItemSkeleton
                    key={index}
                    width="100%"
                    padding="10px"
                    gap="10px"
                  />
                </Media>
              </Fragment>
            ))
        ) : hasOriginalWorks ? (
          originalWorks.map(originalWork => (
            <Fragment key={originalWork.id}>
              <Media greaterThanOrEqual="lg">
                <OriginalWorkItem originalWork={originalWork} />
              </Media>
              <Media lessThan="lg" className={css({ width: '100%' })}>
                <OriginalWorkItem
                  originalWork={originalWork}
                  width="100%"
                  padding="10px"
                  originalWorkItemInnerProps={{
                    gap: '10px',
                    isMobile: true,
                  }}
                />
              </Media>
            </Fragment>
          ))
        ) : (
          <LikeHistoryEmpty type="original_work" />
        )}
      </HStack>
    </CategoryWrapper>
  );
}
