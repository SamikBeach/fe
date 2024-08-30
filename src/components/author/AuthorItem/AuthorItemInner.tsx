import { AuthorServerModel } from '@models/author';
import { ChatBubbleIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { Avatar, Text } from '@radix-ui/themes';
import { getBornAndDiedDateText } from '@utils/author';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface Props {
  author: AuthorServerModel;
}

export default function AuthorItemInner({ author }: Props) {
  const {
    name,
    image_url,
    born_date,
    born_date_is_bc,
    died_date,
    died_date_is_bc,
    liked_users,
    comments,
    original_works,
  } = author;

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
      <VStack alignItems="start" justify="space-between">
        <VStack alignItems="start" gap="0">
          <Link
            href={`/author/${author.id}`}
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
              {name}
            </Text>
          </Link>
          <HStack>
            <Text size="2" color="gray">
              {getBornAndDiedDateText({
                bornDate: born_date,
                diedDate: died_date,
                bornDateIsBc: born_date_is_bc === 1,
                diedDateIsBc: died_date_is_bc === 1,
              })}
            </Text>
          </HStack>
          <HStack>
            <Text size="2" color="gray">
              {original_works?.length} original works
            </Text>
            <Text size="2" color="gray">
              330 editions
            </Text>
          </HStack>
        </VStack>
        <HStack>
          <HStack gap="3px">
            <Text size="2" color="gray">
              {liked_users?.length}
            </Text>
            <HeartFilledIcon color="gray" />
          </HStack>
          <HStack gap="3px">
            <Text size="2" color="gray">
              {comments?.length}
            </Text>
            <ChatBubbleIcon color="gray" />
          </HStack>
        </HStack>
      </VStack>
    </HStack>
  );
}
