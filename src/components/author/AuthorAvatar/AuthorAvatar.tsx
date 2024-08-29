import { AuthorHoverCard } from '@components/author/AuthorHoverCard';
import { AuthorServerModel } from '@models/author';
import { Avatar, AvatarProps, Text } from '@radix-ui/themes';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

interface Props extends Omit<AvatarProps, 'fallback'> {
  author: AuthorServerModel;
  withName?: boolean;
}

function AuthorAvatar({ author, withName = false, ...props }: Props) {
  return (
    <AuthorHoverCard.Root>
      <AuthorHoverCard.Trigger>
        <HStack display="inline">
          <Link href={`/author/${author.id}`}>
            <Avatar
              size="2"
              radius="full"
              src={author.image_url ?? undefined}
              fallback={author.name[0]}
              {...props}
            />
          </Link>{' '}
          {withName && (
            <Link href={`/author/${author.id}`}>
              <Text
                weight="medium"
                className={css({
                  cursor: 'pointer',
                  _hover: {
                    textDecoration: 'underline',
                  },
                })}
              >
                {author.name}
              </Text>
            </Link>
          )}
        </HStack>
      </AuthorHoverCard.Trigger>
      <AuthorHoverCard.Content author={author} side="top" />
    </AuthorHoverCard.Root>
  );
}

export default AuthorAvatar;
