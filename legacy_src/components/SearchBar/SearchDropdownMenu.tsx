import { Avatar, DropdownMenu, Spinner, Text } from '@radix-ui/themes';
import { ComponentProps, forwardRef } from 'react';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';
import Highlighter from 'react-highlight-words';
import { WritingHoverCard } from 'legacy_src/components/WritingHoverCard';
import AuthorHoverCard from 'legacy_src/components/AuthorHoverCard/AuthorHoverCard';
import { useRouter } from 'next/navigation';
import { AuthorServerModel } from 'legacy_src/models/author';
import { WritingServerModel } from 'legacy_src/models/writing';

interface Props extends ComponentProps<typeof DropdownMenu.Root> {
  authors: AuthorServerModel[];
  writings: WritingServerModel[];
  isLoading: boolean;
  searchValue: string;
  onKeyDownDropdownMenuContent: (
    e: React.KeyboardEvent<HTMLDivElement>
  ) => void;
}

const SearchDropdownMenu = forwardRef<HTMLDivElement, Props>(function (
  {
    children,
    open,
    onOpenChange,
    authors,
    writings,
    isLoading,
    searchValue,
    onKeyDownDropdownMenuContent,
    ...props
  },
  ref
) {
  const router = useRouter();

  const hasAuthors = authors.length > 0;
  const hasWritings = writings.length > 0;
  const hasResults = hasAuthors && hasWritings;

  const renderDropdonwMenuContentInner = () => {
    if (isLoading || searchValue === '') {
      return (
        <VStack width="416px" height="400px" justify="center">
          <Spinner />
        </VStack>
      );
    }

    if (!hasResults) {
      return (
        <VStack width="416px" height="400px" justify="center">
          <Text>No Results</Text>
        </VStack>
      );
    }

    return (
      <>
        {hasAuthors && (
          <DropdownMenu.Group title="Author">
            <DropdownMenu.Label>Author</DropdownMenu.Label>
            {authors.map(author => (
              <AuthorHoverCard.Root
                key={author.id}
                openDelay={0}
                closeDelay={0}
              >
                <AuthorHoverCard.Trigger>
                  <DropdownMenu.Item
                    className={css({
                      cursor: 'pointer',

                      _focus: { backgroundColor: 'gray.50', color: 'black' },
                    })}
                    onClick={() => router.push(`/author/${author.id}`)}
                  >
                    <Avatar
                      src={author.image_url ?? undefined}
                      fallback={author.name[0]}
                      radius="full"
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
                </AuthorHoverCard.Trigger>
                <AuthorHoverCard.Content author={author} side="left" />
              </AuthorHoverCard.Root>
            ))}
          </DropdownMenu.Group>
        )}
        {hasWritings && (
          <DropdownMenu.Group title="Writing">
            <DropdownMenu.Label>Writing</DropdownMenu.Label>
            {writings.map(writing => (
              <WritingHoverCard.Root
                key={writing.id}
                openDelay={0}
                closeDelay={0}
              >
                <WritingHoverCard.Trigger>
                  <DropdownMenu.Item
                    className={css({
                      width: '400px',
                      cursor: 'pointer',

                      _focus: {
                        backgroundColor: 'gray.50',
                        color: 'black',
                      },
                    })}
                    onClick={() => router.push(`/writing/${writing.id}`)}
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
                </WritingHoverCard.Trigger>
                <WritingHoverCard.Content writing={writing} side="left" />
              </WritingHoverCard.Root>
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
        onKeyDown={e => {
          onKeyDownDropdownMenuContent(e);
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
