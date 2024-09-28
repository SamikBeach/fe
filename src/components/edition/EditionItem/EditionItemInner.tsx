import { AuthorAvatar } from '@components/author/AuthorAvatar';
import { EditionServerModel } from '@models/edition';
import { ChatBubbleIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { Avatar, Tooltip, Text } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface Props {
  edition: EditionServerModel;
}

export default function EditionItemInner({ edition }: Props) {
  const t = useTranslations('Edition');

  const {
    title,
    author,
    image_url,
    like_count,
    comment_count,
    publication_date,
  } = edition;

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

        <HStack gap="8px">
          <Text size="2" color="gray">
            {t('editions')} 25
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
