import { OriginalWorkServerModel } from '@models/original-work';
import { HoverCard } from '@radix-ui/themes';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
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

        router.push(`/original_work/${originalWork.id}`);
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
