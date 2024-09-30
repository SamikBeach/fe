import { AuthorServerModel } from '@models/author';
import { ChatBubbleIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { Avatar, Text } from '@radix-ui/themes';
import { getBornAndDiedDateText } from '@utils/author';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GiBlackBook, GiSecretBook } from 'react-icons/gi';

import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface Props {
  author: AuthorServerModel;
}

export default function AuthorItemInner({ author }: Props) {
  const locale = useLocale();

  const router = useRouter();

  const {
    name,
    name_in_kor,
    image_url,
    born_date,
    born_date_is_bc,
    died_date,
    died_date_is_bc,
    like_count,
    comment_count,
    original_work_count,
    edition_count,
  } = author;

  return (
    <HStack gap="20px">
      <Link href={`/author/${author.id}`}>
        <Avatar
          src={image_url ?? undefined}
          fallback={locale === 'ko' ? name_in_kor[0] : name[0]}
          radius="full"
          size="7"
        />
      </Link>
      <VStack alignItems="start" justify="space-between">
        <VStack alignItems="start" gap="0">
          <Link
            href={`/author/${author.id}`}
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
              onClick={() => router.push(`/author/${author.id}`)}
              className={css({
                cursor: 'pointer',
                lineHeight: '19px',

                _hover: {
                  textDecoration: 'underline',
                },
              })}
            >
              {locale === 'ko' ? name_in_kor : name}
            </Text>
          </Link>
          {locale === 'ko' && (
            <Link
              href={`/author/${author.id}`}
              className={css({ lineHeight: 1.2 })}
            >
              <Text
                size="2"
                color="gray"
                weight="medium"
                className={css({
                  cursor: 'pointer',
                  lineHeight: 1.2,

                  _hover: {
                    textDecoration: 'underline',
                  },
                })}
              >
                {name}
              </Text>
            </Link>
          )}
          <HStack>
            <Text size="2" color="gray" mt="2px">
              {getBornAndDiedDateText({
                bornDate: born_date,
                diedDate: died_date,
                bornDateIsBc: born_date_is_bc === 1,
                diedDateIsBc: died_date_is_bc === 1,
                locale,
              })}
            </Text>
          </HStack>
        </VStack>
        <HStack gap="10px" width="100%" alignItems="start">
          <HStack gap="3px">
            <GiSecretBook
              className={css({
                display: 'inline',
                cursor: 'pointer',
                color: 'gray.500',
              })}
              size="18px"
            />{' '}
            <Text size="2" color="gray">
              {original_work_count}
            </Text>
          </HStack>
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
