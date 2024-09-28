import { EditionServerModel } from '@models/edition';
import { HoverCard } from '@radix-ui/themes';
import classNames from 'classnames';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';
import OringinalWorkItemInner from '../EditionItem/EditionItemInner';

interface EditionHoverCardContentProps
  extends ComponentProps<typeof HoverCard.Content> {
  edition: EditionServerModel;
}

function EditionHoverCardContent({
  edition,
  className,
  ...props
}: EditionHoverCardContentProps) {
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
      <OringinalWorkItemInner edition={edition} />
    </HoverCard.Content>
  );
}

function EditionHoverCard() {
  return <></>;
}

EditionHoverCard.Content = EditionHoverCardContent;
EditionHoverCard.Trigger = HoverCard.Trigger;
EditionHoverCard.Root = HoverCard.Root;

export default EditionHoverCard;
