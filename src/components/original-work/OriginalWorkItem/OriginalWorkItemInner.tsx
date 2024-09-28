import { AuthorAvatar } from '@components/author/AuthorAvatar';
import { OriginalWorkServerModel } from '@models/original-work';
import { ChatBubbleIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { Avatar, Tooltip, Text } from '@radix-ui/themes';
import { getPublicationDateText } from '@utils/original-work';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface Props {
  originalWork: OriginalWorkServerModel;
}

export default function OringinalWorkItemInner({ originalWork }: Props) {
  const locale = useLocale();

  const {
    title,
    title_in_eng,
    title_in_kor,
    author,
    like_count,
    comment_count,
  } = originalWork;

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
              })}
            >
              <Text
                size="3"
                weight="bold"
                className={css({
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
              })}
            >
              <Text
                size="2"
                weight="medium"
                className={css({
                  color: 'gray.700',

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

          {/* {locale === 'ko' && (
            <Tooltip content={title}>
              <Link
                href={`/original-work/${originalWork.id}`}
                className={css({
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  maxWidth: '240px',
                })}
              >
                <Text
                  size="2"
                  weight="medium"
                  className={css({
                    color: 'gray.700',

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
          )} */}

          <Text size="2" color="gray">
            {getPublicationDateText({ originalWork })}
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
            25 editions
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
