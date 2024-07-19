import { SelectItem } from '@models/common';
import { Popover, ScrollArea, Text } from '@radix-ui/themes';
import { ComponentProps, useEffect, useState } from 'react';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

interface Props extends ComponentProps<typeof Popover.Root> {
  items: SelectItem[];
}

function FilterPopover({ children, items, ...props }: Props) {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    console.log({ open });
    if (!open) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        setFocusedIndex(prev => (prev === items.length - 1 ? prev : prev + 1));
      }

      if (e.key === 'ArrowUp') {
        setFocusedIndex(prev => (prev === 0 ? prev : prev - 1));
      }

      if (e.key === 'Enter') {
        // TODO

        setOpen?.(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, focusedIndex, setFocusedIndex, items, setOpen]);

  return (
    <Popover.Root
      modal={false}
      open={open}
      onOpenChange={opened => {
        if (!opened) {
          setFocusedIndex(-1);
        }

        setOpen?.(opened);
      }}
      {...props}
    >
      {children}
      <Popover.Content
        onOpenAutoFocus={e => e.preventDefault()}
        className={css({
          padding: '10px',
          width: '240px',
          maxHeight: '300px',
        })}
      >
        <ScrollArea>
          {items.map((item, index) => (
            <HStack
              key={item.id}
              className={css({
                py: '4px',
                px: '8px',
                background: focusedIndex === index ? 'gray.100' : 'transparent',
                borderRadius: '6px',
                fontSize: '14px',
                cursor: 'pointer',

                _hover: {
                  background: 'gray.100',
                },
              })}
            >
              <Text>{item.value}</Text>
            </HStack>
          ))}
        </ScrollArea>
      </Popover.Content>
    </Popover.Root>
  );
}

export default Object.assign(FilterPopover, {
  Trigger: Popover.Trigger,
});
