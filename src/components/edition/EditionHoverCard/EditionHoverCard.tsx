import { EditionServerModel } from '@models/edition';
import { HoverCard } from '@radix-ui/themes';
import classNames from 'classnames';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';
import OringinalWorkItemInner from '../EditionItem/EditionItemInner';
import { useQuery } from '@tanstack/react-query';
import { getEditionById } from '@apis/edition';

interface EditionHoverCardContentProps
  extends ComponentProps<typeof HoverCard.Content> {
  edition?: EditionServerModel;
  editionId?: number;
  open?: boolean;
}

function EditionHoverCardContent({
  edition: editionFromProps,
  editionId,
  className,
  open,
  ...props
}: EditionHoverCardContentProps) {
  const { data: editionFromQuery } = useQuery({
    queryKey: ['edition', editionId],
    queryFn: () => {
      if (editionId == null) {
        throw new Error('editionId is required');
      }

      return getEditionById({ id: editionId });
    },
    enabled: open && editionId != null && editionFromProps == null,
    select: response => response.data,
  });

  const edition = editionFromProps ?? editionFromQuery;

  if (edition == null) {
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
