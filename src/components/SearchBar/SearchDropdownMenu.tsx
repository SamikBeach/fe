import { AuthorServerModel } from '@models/author';
import { FocusScope } from '@radix-ui/react-focus-scope';
import { DropdownMenu } from '@radix-ui/themes';
import { ComponentProps, forwardRef } from 'react';
import { css } from 'styled-system/css';

interface Props extends ComponentProps<typeof DropdownMenu.Root> {
  authors: AuthorServerModel[];
  onKeyDownDropdownMenuItem: (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => void;
}

const SearchDropdownMenu = forwardRef<HTMLDivElement, Props>(function (
  {
    children,
    open,
    onOpenChange,
    onKeyDownDropdownMenuItem,
    authors,
    ...props
  },
  ref
) {
  return (
    <DropdownMenu.Root
      modal={false}
      open={open}
      onOpenChange={onOpenChange}
      {...props}
    >
      {children}
      <FocusScope trapped={false}>
        <DropdownMenu.Content
          ref={ref}
          className={css({ width: '260px', minHeight: '200px' })}
          onInteractOutside={e => e.preventDefault()}
          onPointerDownOutside={() => onOpenChange?.(false)}
        >
          {authors.map((author, index) => (
            <DropdownMenu.Item
              onKeyDown={e => onKeyDownDropdownMenuItem(e, index)}
            >
              {author.name}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </FocusScope>
    </DropdownMenu.Root>
  );
});

export default Object.assign(SearchDropdownMenu, {
  Trigger: DropdownMenu.Trigger,
});
