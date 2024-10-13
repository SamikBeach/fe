import { OriginalWorkServerModel } from '@models/original-work';
import { HoverCard } from '@radix-ui/themes';
import classNames from 'classnames';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';
import OringinalWorkItemInner from '../OriginalWorkItem/OriginalWorkItemInner';
import { useQuery } from '@tanstack/react-query';
import { getOriginalWorkById } from '@apis/original-work';

interface OriginalWorkHoverCardContentProps
  extends ComponentProps<typeof HoverCard.Content> {
  originalWork?: OriginalWorkServerModel;
  originalWorkId?: number;
  open?: boolean;
}

function OriginalWorkHoverCardContent({
  originalWork: originalWorkFromProps,
  originalWorkId,
  className,
  open,
  ...props
}: OriginalWorkHoverCardContentProps) {
  const { data: originalWorkFromQuery } = useQuery({
    queryKey: ['original-work', originalWorkId],
    queryFn: () => {
      if (originalWorkId == null) {
        throw new Error('originalWorkId is required');
      }

      return getOriginalWorkById({ id: originalWorkId });
    },
    enabled: open && originalWorkId != null && originalWorkFromProps == null,
    select: response => response.data,
  });

  const originalWork = originalWorkFromProps ?? originalWorkFromQuery;

  if (originalWork == null) {
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
