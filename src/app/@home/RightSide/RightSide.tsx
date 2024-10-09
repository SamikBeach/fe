import { AuthorAvatar } from '@components/author/AuthorAvatar';

import { css } from 'styled-system/css';
import { HStack, VStack, styled } from 'styled-system/jsx';
import { ScrollArea, Text } from '@radix-ui/themes';
import { OriginalWorkShort } from '@components/original-work/OriginalWorkShort';
import { useQuery } from '@tanstack/react-query';
import { getTrendingAuthors } from '@apis/author';
import { getTrendingOriginalWorks } from '@apis/original-work';
import RightSideSkeleton from './RightSideSkeleton';
import { useTranslations } from 'next-intl';
import { getTrendingEditions } from '@apis/edition';
import { EditionShort } from '@components/edition/EditionShort';
import Link from 'next/link';

export default function RightSide() {
  const t = useTranslations();

  const { data: trendingAuthors = [], isLoading: isLoadingTrendingAuthors } =
    useQuery({
      queryKey: ['author/trending'],
      queryFn: getTrendingAuthors,
      select: response => response.data,
      refetchOnMount: 'always',
    });

  const {
    data: trendingOriginalWorks = [],
    isLoading: isLoadingTrendingOriginalWorks,
  } = useQuery({
    queryKey: ['original-work/trending'],
    queryFn: getTrendingOriginalWorks,
    select: response => response.data,
    refetchOnMount: 'always',
  });

  const { data: trendingEditions = [], isLoading: isLoadingTrendingEditions } =
    useQuery({
      queryKey: ['edition/trending'],
      queryFn: getTrendingEditions,
      select: response => response.data,
      refetchOnMount: 'always',
    });

  return (
    <VStack minWidth="320px" position="sticky" top="0" pt="84px">
      <ScrollArea
        scrollbars="vertical"
        className={css({
          height: 'calc(100vh - 84px)',
          pr: '20px',
        })}
      >
        <VStack gap="8px" width="100%" alignItems="start">
          <Text className={css({ fontWeight: 'medium' })}>
            {t('Home.trending_now')}
          </Text>
          {isLoadingTrendingAuthors ? (
            <RightSideSkeleton />
          ) : (
            trendingAuthors.length > 0 && (
              <Section>
                <Text>{t('Common.authors')}</Text>
                {trendingAuthors.slice(0, 4).map(author => (
                  <AuthorAvatar
                    key={author.id}
                    author={author}
                    withName
                    withSubName
                  />
                ))}
              </Section>
            )
          )}
          {isLoadingTrendingOriginalWorks ? (
            <RightSideSkeleton />
          ) : (
            trendingOriginalWorks.length > 0 && (
              <Section className={css({ gap: '2px' })}>
                <Text>{t('Common.original_works')}</Text>
                {trendingOriginalWorks.slice(0, 4).map(originalWork => (
                  <OriginalWorkShort
                    key={originalWork.id}
                    originalWork={originalWork}
                  />
                ))}
              </Section>
            )
          )}
          {isLoadingTrendingEditions ? (
            <RightSideSkeleton />
          ) : (
            trendingEditions.length > 0 && (
              <Section className={css({ gap: '2px' })}>
                <Text>{t('Common.editions')}</Text>
                {trendingEditions.slice(0, 4).map(edition => (
                  <EditionShort key={edition.id} edition={edition} />
                ))}
              </Section>
            )
          )}
        </VStack>
        <HStack mt="4px">
          <Link href="/terms-of-service">
            <Text
              color="gray"
              size="1"
              className={css({
                cursor: 'pointer',

                _hover: {
                  textDecoration: 'underline',
                },
              })}
            >
              {t('Common.terms_of_service')}
            </Text>
          </Link>
          <Text color="gray" size="1">
            {' · '}
          </Text>
          <Link href="privacy-policy">
            <Text
              color="gray"
              size="1"
              className={css({
                cursor: 'pointer',

                _hover: {
                  textDecoration: 'underline',
                },
              })}
            >
              {t('Common.privacy_policy')}
            </Text>
          </Link>
        </HStack>
      </ScrollArea>
    </VStack>
  );
}

const Section = styled(VStack, {
  base: {
    alignItems: 'start',
    gap: '6px',
    width: '100%',
    bgColor: 'gray.100',
    fontSize: '14px',
    fontWeight: 'medium',
    borderRadius: '8px',
    px: '14px',
    py: '10px',
  },
});
