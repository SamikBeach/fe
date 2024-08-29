import { OriginalWorkServerModel } from '@models/original-work';
import { HoverCard } from '@radix-ui/themes';
import classNames from 'classnames';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';
import OringinalWorkItemInner from '../OriginalWorkItem/OriginalWorkItemInner';

interface OriginalWorkHoverCardContentProps
  extends ComponentProps<typeof HoverCard.Content> {
  originalWork: OriginalWorkServerModel;
}

function OriginalWorkHoverCardContent({
  originalWork,
  className,
  ...props
}: OriginalWorkHoverCardContentProps) {
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
      <OringinalWorkItemInner originalWork={originalWork} />
    </HoverCard.Content>
  );
}

function OriginalWorkHoverCard() {
  return <></>;
}

OriginalWorkHoverCard.Content = OriginalWorkHoverCardContent;
OriginalWorkHoverCard.Trigger = HoverCard.Trigger;
OriginalWorkHoverCard.Root = HoverCard.Root;

export default OriginalWorkHoverCard;
