import { Avatar, DropdownMenu, Spinner, Text } from '@radix-ui/themes';
import { ComponentProps, forwardRef } from 'react';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';
import Highlighter from 'react-highlight-words';
import { searchAuthors } from '@apis/author';
import { useQuery } from '@tanstack/react-query';
import { searchWritings } from '@apis/writing';

interface Props extends ComponentProps<typeof DropdownMenu.Root> {
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
    searchValue,
    onKeyDownDropdownMenuItem,
    ...props
  },
  ref
) {
  const { data: authors = [], isLoading: isLoadingAuthors } = useQuery({
    queryKey: ['author', searchValue],
    queryFn: () => searchAuthors({ where__name__i_like: searchValue, take: 5 }),
    enabled: searchValue !== '',
    select: response => response.data.data,
  });

  const { data: writings = [], isLoading: isLoadingWritings } = useQuery({
    queryKey: ['writing', searchValue],
    queryFn: () =>
      searchWritings({ where__title__i_like: searchValue, take: 5 }),
    enabled: searchValue !== '',
    select: response => response.data.data,
  });

  const isLoading = isLoadingAuthors || isLoadingWritings;

  const hasAuthors = authors.length > 0;
  const hasWritings = writings.length > 0;
  const hasResults = hasAuthors && hasWritings;

  const renderDropdonwMenuContentInner = () => {
    if (isLoading || searchValue === '') {
      return (
        <VStack width="316px" height="400px" justify="center">
          <Spinner />
        </VStack>
      );
    }

    if (!hasResults) {
      return (
        <VStack width="316px" height="400px" justify="center">
          <Text>No Results</Text>
        </VStack>
      );
    }

    return (
      <>
        {hasAuthors && (
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
        )}
        {hasWritings && (
          <DropdownMenu.Group title="Writing">
            <DropdownMenu.Label>Writing</DropdownMenu.Label>
            {writings.map((writing, index) => (
              <DropdownMenu.Item
                key={writing.id}
                onKeyDown={e => onKeyDownDropdownMenuItem(e, index)}
                className={css({
                  width: '300px',

                  _focus: {
                    backgroundColor: 'gray.50',
                    color: 'black',
                  },
                })}
              >
                <Avatar
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg/440px-Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg"
                  fallback={writing.title?.[0] ?? ''}
                  size="1"
                />
                <Highlighter
                  searchWords={[searchValue]}
                  textToHighlight={writing.title ?? ''}
                  className={css({
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  })}
                  highlightClassName={css({
                    fontWeight: 'bold',
                    backgroundColor: 'transparent',
                  })}
                />
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Group>
        )}
      </>
    );
  };

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
        {renderDropdonwMenuContentInner()}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
});

export default Object.assign(SearchDropdownMenu, {
  Trigger: DropdownMenu.Trigger,
});
