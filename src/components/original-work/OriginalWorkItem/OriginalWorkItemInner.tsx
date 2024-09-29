import { searchEditions } from '@apis/edition';
import { AuthorAvatar } from '@components/author/AuthorAvatar';
import { OriginalWorkServerModel } from '@models/original-work';
import { ChatBubbleIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { Avatar, Tooltip, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { getPublicationDateText } from '@utils/original-work';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface Props {
  originalWork: OriginalWorkServerModel;
}

export default function OringinalWorkItemInner({ originalWork }: Props) {
  const t = useTranslations('OriginalWork');

  const locale = useLocale();

  const {
    title,
    title_in_eng,
    title_in_kor,
    author,
    like_count,
    comment_count,
    editions,
  } = originalWork;

  const { data: editionsFromQuery } = useQuery({
    queryKey: ['edition/search', originalWork.id],
    queryFn: () =>
      searchEditions({ originalWorkId: originalWork.id, limit: 500 }),
    enabled: editions === undefined,
    select: data => data.data.data,
  });

  const editionCount = editions?.length ?? editionsFromQuery?.length ?? 0;

  return (
    <HStack gap="20px">
      <Link href={`/original-work/${originalWork.id}`}>
        <Avatar fallback={title[0]} size="7" />
      </Link>

      <VStack alignItems="start" gap="0">
        <VStack alignItems="start" gap="0">
          <Tooltip content={title_in_kor}>
            <Link
              href={`/original-work/${originalWork.id}`}
              className={css({
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                maxWidth: '240px',
                lineHeight: '19px',
              })}
            >
              <Text
                size="3"
                weight="bold"
                className={css({
                  lineHeight: '19px',
                  cursor: 'pointer',
                  _hover: {
                    textDecoration: 'underline',
                  },
                })}
              >
                {locale === 'ko' ? title_in_kor : title}
              </Text>
            </Link>
          </Tooltip>

          <Tooltip content={title_in_eng}>
            <Link
              href={`/original-work/${originalWork.id}`}
              className={css({
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                maxWidth: '240px',
                lineHeight: '17px',
              })}
            >
              <Text
                size="2"
                weight="medium"
                className={css({
                  color: 'gray.700',
                  lineHeight: '17px',

                  cursor: 'pointer',
                  _hover: {
                    textDecoration: 'underline',
                  },
                })}
              >
                {title_in_eng}
              </Text>
            </Link>
          </Tooltip>

          {locale === 'ko' && (
            <Tooltip content={title}>
              <Link
                href={`/original-work/${originalWork.id}`}
                className={css({
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  maxWidth: '240px',
                  lineHeight: '17px',
                })}
              >
                <Text
                  size="2"
                  weight="medium"
                  className={css({
                    color: 'gray.700',
                    lineHeight: '17px',

                    cursor: 'pointer',
                    _hover: {
                      textDecoration: 'underline',
                    },
                  })}
                >
                  {title}
                </Text>
              </Link>
            </Tooltip>
          )}

          <Text size="2" color="gray">
            {getPublicationDateText({ originalWork, locale })}
          </Text>
        </VStack>

        <AuthorAvatar
          author={author}
          withName
          size="1"
          textProps={{ size: '1', color: 'gray' }}
        />

        <HStack gap="8px">
          <Text size="2" color="gray">
            {t('editions')} {editionCount}
          </Text>
          <HStack gap="3px">
            <Text size="2" color="gray">
              {like_count}
            </Text>
            <HeartFilledIcon color="gray" />
          </HStack>
          <HStack gap="3px">
            <Text size="2" color="gray">
              {comment_count}
            </Text>
            <ChatBubbleIcon color="gray" />
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  );
}
