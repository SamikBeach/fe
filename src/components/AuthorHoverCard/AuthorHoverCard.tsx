import { AuthorServerModel } from '@models/author';
import { Avatar, HoverCard, Text } from '@radix-ui/themes';
import classNames from 'classnames';
import { format } from 'date-fns';
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
  const splitBornDate = author.born_date?.split('-');
  const isValidBornDate =
    author.born_date !== '' &&
    splitBornDate?.[1] !== '00' &&
    splitBornDate?.[2] !== '00';

  const splitDiedDate = author.died_date?.split('-');
  const isValidDiedDate =
    author.died_date !== '' &&
    splitDiedDate?.[1] !== '00' &&
    splitDiedDate?.[2] !== '00';

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
      {...props}
    >
      <HStack alignItems="start" gap="20px">
        <Avatar src={author.image_url} fallback="폴백" radius="full" size="7" />
        <VStack alignItems="start" gap="0">
          <Text size="4" weight="bold">
            {author.name}
          </Text>
          <Text size="3">{author.name_in_kor}</Text>
          <HStack>
            <Text size="2" color="gray">
              {author.born_date_is_bc ? '기원전 ' : ''}
              {isValidBornDate && author.born_date != null
                ? format(new Date(author.born_date), 'y년 M월 d일 ')
                : '???'}
              - {author.died_date_is_bc ? '기원전 ' : ''}
              {isValidDiedDate && author.died_date != null
                ? format(new Date(author.died_date), 'y년 M월 d일 ')
                : '???'}
            </Text>
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
