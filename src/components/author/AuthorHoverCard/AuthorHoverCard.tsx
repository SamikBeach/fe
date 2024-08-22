import { AuthorServerModel } from '@models/author';
import { ChatBubbleIcon, HeartFilledIcon } from '@radix-ui/react-icons';
import { Avatar, HoverCard, Text } from '@radix-ui/themes';
import { getBornAndDiedDateText } from '@utils/author';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface AuthorHoverCardContentProps
  extends ComponentProps<typeof HoverCard.Content> {
  author: AuthorServerModel;
}

function AuthorHoverCardContent({
  author,
  className,
  ...props
}: AuthorHoverCardContentProps) {
  const {
    id,
    name,
    image_url,
    born_date,
    died_date,
    born_date_is_bc,
    died_date_is_bc,
    original_works = [],
  } = author;

  const router = useRouter();

  return (
    <HoverCard.Content
      className={classNames(
        css({
          padding: '20px',
          cursor: 'pointer',
          width: '400px',
        }),
        className
      )}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();

        router.push(`/author/${id}`);
      }}
      {...props}
    >
      <HStack alignItems="start" gap="20px">
        <Avatar
          src={image_url ?? undefined}
          fallback={name[0]}
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
                {original_works.length} original works
              </Text>
              <Text size="2" color="gray">
                3 editions
              </Text>
            </HStack>
          </VStack>

          <HStack gap="2px">
            <HStack gap="0">
              <Text size="2">351</Text>
              <HeartFilledIcon
                color="gray"
                width="24px"
                className={css({ ml: '-2px' })}
              />
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
    </HoverCard.Content>
  );
}

function AuthorHoverCard() {
  return <></>;
}

AuthorHoverCard.Content = AuthorHoverCardContent;
AuthorHoverCard.Trigger = HoverCard.Trigger;
AuthorHoverCard.Root = HoverCard.Root;

export default AuthorHoverCard;
