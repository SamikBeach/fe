import { AuthorServerModel } from '@models/author';
import { HoverCard } from '@radix-ui/themes';
import classNames from 'classnames';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';
import AuthorItemInner from '../AuthorItem/AuthorItemInner';

interface AuthorHoverCardContentProps
  extends ComponentProps<typeof HoverCard.Content> {
  author: AuthorServerModel;
}

function AuthorHoverCardContent({
  author,
  className,
  ...props
}: AuthorHoverCardContentProps) {
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
