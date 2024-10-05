import { UserServerModel } from '@models/user';
import { HoverCard } from '@radix-ui/themes';
import classNames from 'classnames';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';
import UserItemInner from '../UserItem/UserItemInner';

interface UserHoverCardContentProps
  extends ComponentProps<typeof HoverCard.Content> {
  user: UserServerModel;
}

function UserHoverCardContent({
  user,
  className,
  ...props
}: UserHoverCardContentProps) {
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
      <UserItemInner user={user} />
    </HoverCard.Content>
  );
}

function UserHoverCard() {
  return <></>;
}

UserHoverCard.Content = UserHoverCardContent;
UserHoverCard.Trigger = HoverCard.Trigger;
UserHoverCard.Root = HoverCard.Root;

export default UserHoverCard;
