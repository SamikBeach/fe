import AuthorHoverCard from '@components/AuthorHoverCard/AuthorHoverCard';
import { AuthorServerModel } from '@models/author';
import { Avatar, AvatarProps } from '@radix-ui/themes';

interface Props extends Omit<AvatarProps, 'fallback'> {
  author: AuthorServerModel;
}

function AuthorAvatar({ author, ...props }: Props) {
  return (
    <AuthorHoverCard.Root>
      <AuthorHoverCard.Trigger>
        <Avatar
          size="2"
          radius="full"
          src={author.image_url ?? undefined}
          fallback={author.name[0]}
          {...props}
        />
      </AuthorHoverCard.Trigger>
      <AuthorHoverCard.Content author={author} side="top" />
    </AuthorHoverCard.Root>
  );
}

export default AuthorAvatar;
