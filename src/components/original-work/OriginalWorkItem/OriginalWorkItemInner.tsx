import { AuthorAvatar } from '@components/author/AuthorAvatar';
import { OriginalWorkServerModel } from '@models/original-work';
import { ChatBubbleIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { Avatar, Tooltip, Text } from '@radix-ui/themes';
import { getPublicationDateText } from '@utils/original-work';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { GiBlackBook, GiSecretBook } from 'react-icons/gi';
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
    edition_count,
  } = originalWork;

  return (
    <HStack gap="20px">
      <Link href={`/original-work/${originalWork.id}`}>
        <Avatar
          radius="full"
          fallback={
            <GiSecretBook
              className={css({
                display: 'inline',
                cursor: 'pointer',
                color: 'gray.500',
              })}
              size="30px"
            />
          }
          size="5"
        />
      </Link>

      <VStack alignItems="start" justify="space-between">
        <VStack alignItems="start" gap="2px">
          <Tooltip content={`${title_in_kor} - ${title_in_eng}`}>
            <Link
              href={`/original-work/${originalWork.id}`}
              className={css({
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',

                maxWidth: '270px',
                lineHeight: '19px',
                color: 'gray.500',

                cursor: 'pointer',
                _hover: {
                  textDecoration: 'underline',
                },
              })}
            >
              <Text
                size="3"
                weight="bold"
                className={css({
                  lineHeight: '19px',
                  color: 'black',
                })}
              >
                {locale === 'ko' ? title_in_kor : title}
              </Text>{' '}
              <Text
                size="2"
                className={css({
                  fontSize: '13px',
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
          )} */}

          <Text size="1" color="gray">
            {getPublicationDateText({ originalWork, locale })}
          </Text>

          <AuthorAvatar
            author={author}
            withName
            size="1"
            textProps={{ size: '1', color: 'gray' }}
          />
        </VStack>

        <HStack gap="10px" width="100%" alignItems="start">
          <HStack gap="3px">
            <GiBlackBook
              className={css({
                display: 'inline',
                cursor: 'pointer',
                color: 'gray.500',
              })}
              size="18px"
            />
            <Text size="2" color="gray">
              {edition_count}
            </Text>
          </HStack>
          <HStack gap="3px">
            <HeartFilledIcon
              width="16px"
              height="16px"
              className={css({
                color: 'gray.500',
              })}
            />
            <Text size="2" color="gray">
              {like_count}
            </Text>
          </HStack>
          <HStack gap="3px">
            <ChatBubbleIcon
              width="16px"
              height="16px"
              className={css({
                color: 'gray.500',
              })}
            />
            <Text size="2" color="gray">
              {comment_count}
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  );
}
