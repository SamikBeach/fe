import { AuthorServerModel } from '@models/author';
import { Avatar, DropdownMenu, Text } from '@radix-ui/themes';
import { ComponentProps, forwardRef } from 'react';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';
import Highlighter from 'react-highlight-words';

interface Props extends ComponentProps<typeof DropdownMenu.Root> {
  authors: AuthorServerModel[];
  searchValue: string;
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
    authors,
    searchValue,
    onKeyDownDropdownMenuItem,
    ...props
  },
  ref
) {
  const hasNoAuthors = authors.length === 0;

  return (
    <DropdownMenu.Root
      modal={false}
      open={open}
      onOpenChange={onOpenChange}
      {...props}
    >
      {children}
      <DropdownMenu.Content
        ref={ref}
        className={css({ width: '260px' })}
        onInteractOutside={e => e.preventDefault()}
        onPointerDownOutside={e => {
          if (
            (e.target as HTMLElement).className.includes('rt-TextFieldInput')
          ) {
            return;
          }

          onOpenChange?.(false);
        }}
      >
        {hasNoAuthors ? (
          <VStack height="160px" justify="center">
            <Text>No Results</Text>
          </VStack>
        ) : (
          <>
            <DropdownMenu.Group title="Author">
              <DropdownMenu.Label>Author</DropdownMenu.Label>
              {authors.map((author, index) => (
                <DropdownMenu.Item
                  key={author.id}
                  onKeyDown={e => onKeyDownDropdownMenuItem(e, index)}
                  className={css({
                    _focus: { backgroundColor: 'gray.50', color: 'black' },
                  })}
                >
                  <Avatar
                    src={author.image_url ?? undefined}
                    fallback={author.name[0]}
                    size="1"
                  />
                  <Highlighter
                    searchWords={[searchValue]}
                    textToHighlight={author.name}
                    highlightClassName={css({
                      fontWeight: 'bold',
                      backgroundColor: 'transparent',
                    })}
                  />
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Group>
            <DropdownMenu.Group title="Book">
              <DropdownMenu.Label>Book</DropdownMenu.Label>
              {authors.map((author, index) => (
                <DropdownMenu.Item
                  key={author.id}
                  onKeyDown={e => onKeyDownDropdownMenuItem(e, index)}
                  className={css({
                    _focus: { backgroundColor: 'gray.50', color: 'black' },
                  })}
                >
                  <Avatar
                    src={author.image_url ?? undefined}
                    fallback={author.name[0]}
                    size="1"
                  />
                  <Highlighter
                    searchWords={[searchValue]}
                    textToHighlight={author.name}
                    highlightClassName={css({
                      fontWeight: 'bold',
                      backgroundColor: 'transparent',
                    })}
                  />
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Group>
          </>
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
});

export default Object.assign(SearchDropdownMenu, {
  Trigger: DropdownMenu.Trigger,
});
