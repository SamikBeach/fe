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
        </VStack>
      </VStack>
    </HStack>
  );
}
