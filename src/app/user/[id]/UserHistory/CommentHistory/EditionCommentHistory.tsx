import { CategoryWrapper } from '../styled-components';
import { HStack } from 'styled-system/jsx';
import { Text } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';
import { getUserComments } from '@apis/user';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
  EditionItem,
  EditionItemSkeleton,
} from '@components/edition/EditionItem';
import CommentHistoryEmpty from './CommentHistoryEmpty';
import { Fragment } from 'react';
import { Media } from '@app/media';
import { css } from 'styled-system/css';

export default function EditionCommentHistory() {
  const t = useTranslations('Common');

  const params = useParams();
  const userId = Number(params.id);

  const { data, isLoading } = useQuery({
    queryKey: ['user/comment', userId],
    queryFn: () => getUserComments({ userId }),
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
            .map((_, index) => (
              <Fragment key={index}>
                <Media greaterThanOrEqual="lg">
                  <EditionItemSkeleton key={index} />
                </Media>
                <Media lessThan="lg" className={css({ width: '100%' })}>
                  <EditionItemSkeleton
                    key={index}
                    width="100%"
                    padding="10px"
                    gap="10px"
                  />
                </Media>
              </Fragment>
            ))
        ) : hasEditions ? (
          editions.map(edition => (
            <Fragment key={edition.id}>
              <Media greaterThanOrEqual="lg">
                <EditionItem edition={edition} />
              </Media>
              <Media lessThan="lg" className={css({ width: '100%' })}>
                <EditionItem
                  edition={edition}
                  width="100%"
                  padding="10px"
                  editionItemInnerProps={{ gap: '10px', isMobile: true }}
                />
              </Media>
            </Fragment>
          ))
        ) : (
          <CommentHistoryEmpty type="edition" />
        )}
      </HStack>
    </CategoryWrapper>
  );
}
