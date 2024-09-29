import { searchOriginalWorks } from '@apis/original-work';
import { AuthorAvatar } from '@components/author/AuthorAvatar';
import { EditionServerModel } from '@models/edition';
import { ChatBubbleIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { Avatar, Tooltip, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { GiSecretBook } from 'react-icons/gi';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface Props {
  edition: EditionServerModel;
}

export default function EditionItemInner({ edition }: Props) {
  const locale = useLocale();

  const {
    title,
    author,
    image_url,
    like_count,
    comment_count,
    publication_date,
    original_works,
  } = edition;

  const { data: originalWorksFromQuery } = useQuery({
    queryKey: ['edition/search', edition.id],
    queryFn: () =>
      searchOriginalWorks({ editionId: edition.id, limit: 500, locale }),
    enabled: original_works === undefined,
    select: data => data.data.data,
  });

  const originalWorks = original_works ?? originalWorksFromQuery ?? [];

  return (
    <HStack gap="20px">
      <Link href={`/edition/${edition.id}`}>
        <Avatar src={image_url ?? undefined} fallback={title[0]} size="7" />
      </Link>

      <VStack alignItems="start" gap="0">
        <VStack alignItems="start" gap="0">
          <Tooltip content={title}>
            <Link
              href={`/edition/${edition.id}`}
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

          <Text size="2" color="gray">
            {publication_date}
          </Text>
        </VStack>

        <AuthorAvatar
          author={author}
          withName
          size="1"
          textProps={{ size: '1', color: 'gray' }}
        />

        <HStack>
          {originalWorks.map(originalWork => (
            <Link
              key={originalWork.id}
              href={`/original-work/${originalWork.id}`}
              onClick={e => e.stopPropagation()}
              className={css({
                cursor: 'pointer',
                color: 'gray.600',
              })}
            >
              <GiSecretBook
                className={css({
                  display: 'inline',
                  cursor: 'pointer',
                  color: 'gray.600',
                })}
                size="24px"
              />
              <Text
                className={css({
                  _hover: {
                    textDecoration: 'underline',
                  },
                })}
              >
                {originalWork.title}
              </Text>
            </Link>
          ))}
        </HStack>

        <HStack gap="8px">
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
