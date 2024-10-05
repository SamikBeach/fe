import { UserServerModel } from '@models/user';
import { Avatar, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface Props {
  user: UserServerModel;
}

export default function UserItemInner({ user }: Props) {
  const router = useRouter();

  const { nickname } = user;

  return (
    <HStack gap="20px">
      <Link href={`/user/${user.id}`}>
        <Avatar
          //   src={image_url ?? undefined}
          fallback={nickname?.[0] ?? ''}
          radius="full"
          size="7"
        />
      </Link>
      <VStack alignItems="start" justify="space-between">
        <VStack alignItems="start" gap="0">
          <Link
            href={`/user/${user.id}`}
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
              onClick={() => router.push(`/user/${user.id}`)}
              className={css({
                cursor: 'pointer',
                lineHeight: '19px',

                _hover: {
                  textDecoration: 'underline',
                },
              })}
            >
              {nickname}
            </Text>
          </Link>
          {/* <HStack>
            <Text size="2" color="gray" mt="2px">
              {getBornAndDiedDateText({
                bornDate: born_date,
                diedDate: died_date,
                bornDateIsBc: born_date_is_bc === 1,
                diedDateIsBc: died_date_is_bc === 1,
                locale,
              })}
            </Text>
          </HStack> */}
        </VStack>
        {/* <HStack gap="10px" width="100%" alignItems="start">
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
        </HStack> */}
      </VStack>
    </HStack>
  );
}
