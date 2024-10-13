import { AuthorServerModel } from '@models/author';
import { HoverCard } from '@radix-ui/themes';
import classNames from 'classnames';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';
import AuthorItemInner from '../AuthorItem/AuthorItemInner';
import { useQuery } from '@tanstack/react-query';
import { getAuthorById } from '@apis/author';

interface AuthorHoverCardContentProps
  extends ComponentProps<typeof HoverCard.Content> {
  author?: AuthorServerModel;
  authorId?: number;
  open?: boolean;
}

function AuthorHoverCardContent({
  author: authorFromProps,
  authorId,
  className,
  open,
  ...props
}: AuthorHoverCardContentProps) {
  const { data: authorFromQuery } = useQuery({
    queryKey: ['author', authorId],
    queryFn: () => {
      if (authorId == null) {
        throw new Error('authorId is required');
      }

      return getAuthorById({ id: authorId });
    },
    enabled: open && authorId != null && authorFromProps == null,
    select: response => response.data,
  });

  const author = authorFromProps ?? authorFromQuery;

  if (author == null) {
    return;
  }

  return (
    <HoverCard.Content
      className={classNames(
        css({
          padding: '20px',
          width: '400px',
        }),
        className
      )}
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
      {...props}
    >
      <AuthorItemInner author={author} />
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
