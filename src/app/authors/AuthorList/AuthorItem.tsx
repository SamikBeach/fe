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

export default function AuthorItem({ author }: Props) {
  const {
    name,
    image_url,
    born_date,
    born_date_is_bc,
    died_date,
    died_date_is_bc,
  } = author;

  return (
    <Link href={`/author/${author.id}`}>
      <HStack
        gap="20px"
        border="1px solid"
        borderColor="gray.200"
        padding="16px"
        borderRadius="8px"
        width="386px"
        height="130px"
        className={css({ cursor: 'pointer' })}
        _hover={{ scale: 1.02, bgColor: 'gray.50' }}
        transition="scale 0.1s ease-in-out"
      >
        <Avatar
          src={image_url ?? undefined}
          fallback="K"
          radius="full"
          size="7"
        />
        <VStack alignItems="start" justify="space-between">
          <VStack alignItems="start" gap="0">
            <Text size="3" weight="bold">
              {name}
            </Text>
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
                25 original works
              </Text>
              <Text size="2" color="gray">
                330 books
              </Text>
            </HStack>
          </VStack>
          <HStack>
            <HStack gap="3px">
              <Text size="2" color="gray">
                351
              </Text>
              <HeartFilledIcon color="gray" />
            </HStack>
            <HStack gap="3px">
              <Text size="2" color="gray">
                12
              </Text>
              <ChatBubbleIcon color="gray" />
            </HStack>
          </HStack>
        </VStack>
      </HStack>
    </Link>
  );
}
