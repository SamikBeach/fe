import { Button, Popover } from '@radix-ui/themes';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';

interface Props extends ComponentProps<typeof Popover.Root> {}

function SearchPopover({ children, open, onOpenChange, ...props }: Props) {
  return (
    <Popover.Root
      modal={false}
      open={open}
      onOpenChange={onOpenChange}
      {...props}
    >
      {children}
      <Popover.Content
        onOpenAutoFocus={e => e.preventDefault()}
        className={css({ width: '260px' })}
      >
        <VStack>
          <Button
            variant="ghost"
            className={css({ width: '100%', justifyContent: 'start' })}
            onClick={() => onOpenChange?.(false)}
          >
            칸트
          </Button>
          <Button
            variant="ghost"
            className={css({ width: '100%', justifyContent: 'start' })}
            onClick={() => onOpenChange?.(false)}
          >
            니체
          </Button>
          <Button
            variant="ghost"
            className={css({ width: '100%', justifyContent: 'start' })}
            onClick={() => onOpenChange?.(false)}
          >
            비트겐슈타인
          </Button>
        </VStack>
      </Popover.Content>
    </Popover.Root>
  );
}

SearchPopover.Trigger = Popover.Trigger;

export default SearchPopover;
