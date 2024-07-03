import { AuthorServerModel } from '@models/author';
import { Button, Popover } from '@radix-ui/themes';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';

interface Props extends ComponentProps<typeof Popover.Root> {
  authors: AuthorServerModel[];
}

function SearchPopover({
  children,
  open,
  onOpenChange,
  authors,
  ...props
}: Props) {
  return (
    <Popover.Root
      modal={false}
      open={open}
      onOpenChange={onOpenChange}
      {...props}
    >
      {children}
      <Popover.Content
        // onOpenAutoFocus={e => e.preventDefault()}
        className={css({ width: '260px' })}
        autoFocus
      >
        <VStack>
          {authors.map(author => (
            <Button
              variant="ghost"
              className={css({ width: '100%', justifyContent: 'start' })}
              onClick={() => onOpenChange?.(false)}
            >
              {author.name}
            </Button>
          ))}
        </VStack>
      </Popover.Content>
    </Popover.Root>
  );
}

SearchPopover.Trigger = Popover.Trigger;

export default SearchPopover;
