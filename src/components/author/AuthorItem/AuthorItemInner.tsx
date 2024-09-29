import { useProgressRouter } from '@hooks/index';
import { AuthorServerModel } from '@models/author';
import { ChatBubbleIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { Avatar, Text } from '@radix-ui/themes';
import { getBornAndDiedDateText } from '@utils/author';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface Props {
  author: AuthorServerModel;
}

export default function AuthorItemInner({ author }: Props) {
  const {
    name,
    name_in_kor,
    image_url,
    born_date,
    born_date_is_bc,
    died_date,
    died_date_is_bc,
    original_works,
    like_count,
    comment_count,
    editions,
  } = author;

  const locale = useLocale();

  const t = useTranslations();

  const router = useProgressRouter();

  return (
    <HStack gap="20px">
      <Link href={`/author/${author.id}`}>
        <Avatar
          src={image_url ?? undefined}
          fallback="K"
          radius="full"
          size="7"
        />
      </Link>
      <VStack alignItems="start" justify="space-between" gap="4px">
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
        <VStack alignItems="start" gap="0">
          <HStack gap="10px">
            <Text size="2" color="gray">
              {t('Common.original_works')} {original_works?.length}
            </Text>
            <Text size="2" color="gray">
              {t('Common.editions')} {editions?.length}
            </Text>
          </HStack>
          <HStack gap="10px">
            <HStack gap="3px">
              <HeartFilledIcon color="gray" />
              <Text size="2" color="gray">
                {like_count}
              </Text>
            </HStack>
            <HStack gap="3px">
              <ChatBubbleIcon color="gray" />
              <Text size="2" color="gray">
                {comment_count}
              </Text>
            </HStack>
          </HStack>
        </VStack>
      </VStack>
    </HStack>
  );
}
