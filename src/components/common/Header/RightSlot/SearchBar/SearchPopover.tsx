import { searchAuthors } from '@apis/author';
import { searchOriginalWorks } from '@apis/original-work';
import { Avatar, Popover, Spinner, Text } from '@radix-ui/themes';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ComponentProps, useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface Props extends ComponentProps<typeof Popover.Root> {
  searchValue: string;
}

function SearchPopover({
  children,
  open,
  onOpenChange,
  searchValue,
  ...props
}: Props) {
  const router = useRouter();

  const [focusedIndex, setFocusedIndex] = useState(-1);

  const { data: authors = [], isLoading: isLoadingAuthors } = useQuery({
    queryKey: ['author', searchValue],
    queryFn: () => searchAuthors({ keyword: searchValue, limit: 5 }),
    enabled: searchValue !== '',
    select: response => response.data.data,
    placeholderData: keepPreviousData,
  });

  const { data: originalWorks = [], isLoading: isLoadingOriginalWorks } =
    useQuery({
      queryKey: ['originalWork', searchValue],
      queryFn: () => searchOriginalWorks({ keyword: searchValue, limit: 5 }),
      enabled: searchValue !== '',
      select: response => response.data.data,
      placeholderData: keepPreviousData,
    });

  const isLoading = isLoadingAuthors || isLoadingOriginalWorks;

  const hasAuthors = authors.length > 0;
  const hasOriginalWorks = originalWorks.length > 0;
  const hasResults = hasAuthors || hasOriginalWorks;
  const resultCount = authors.length + originalWorks.length;

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        setFocusedIndex(prev => (prev === resultCount - 1 ? prev : prev + 1));
      }

      if (e.key === 'ArrowUp') {
        setFocusedIndex(prev => (prev === 0 ? prev : prev - 1));
      }

      if (e.key === 'Enter') {
        router.push(
          focusedIndex < authors.length
            ? `/author/${authors[focusedIndex].id}`
            : `/originalWork/${originalWorks[focusedIndex - authors.length].id}`
        );

        onOpenChange?.(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    open,
    resultCount,
    authors,
    focusedIndex,
    router,
    originalWorks,
    onOpenChange,
  ]);

  const renderPopoverContentInner = () => {
    if (isLoading || searchValue === '') {
      return (
        <VStack width="400px" height="388px" justify="center">
          <Spinner />
        </VStack>
      );
    }

    if (!hasResults) {
      return (
        <VStack width="400px" height="388px" justify="center">
          <Text>No Results</Text>
        </VStack>
      );
    }

    return (
      <>
        {hasAuthors && (
          <>
            <Text
              color="gray"
              size="2"
              className={css({ px: '10px', py: '14px' })}
            >
              Author
            </Text>
            {authors.map((author, index) => (
              <HStack
                key={index}
                gap="10px"
                className={css({
                  width: '400px',
                  py: '4px',
                  px: '8px',
                  background:
                    focusedIndex === index ? 'gray.100' : 'transparent',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',

                  _hover: {
                    background: 'gray.100',
                  },
                })}
                onClick={() => {
                  router.push(`/author/${author.id}`);
                  onOpenChange?.(false);
                }}
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
              </HStack>
            ))}
          </>
        )}
        {hasOriginalWorks && (
          <>
            <Text
              color="gray"
              size="2"
              className={css({ px: '10px', py: '14px' })}
            >
              Original work
            </Text>
            {originalWorks.map((originalWork, index) => (
              <HStack
                key={index}
                gap="10px"
                className={css({
                  width: '400px',
                  py: '4px',
                  px: '8px',
                  background:
                    focusedIndex === index + authors.length
                      ? 'gray.100'
                      : 'transparent',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',

                  _hover: {
                    background: 'gray.100',
                  },
                })}
                onClick={() => {
                  router.push(`/originalWork/${originalWork.id}`);
                  onOpenChange?.(false);
                }}
              >
                <Avatar
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg/440px-Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg"
                  fallback={originalWork.title?.[0] ?? ''}
                  size="1"
                />
                <Highlighter
                  searchWords={[searchValue]}
                  textToHighlight={originalWork.title ?? ''}
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
              </HStack>
            ))}
          </>
        )}
      </>
    );
  };

  return (
    <Popover.Root
      modal={false}
      open={open}
      onOpenChange={opened => {
        if (!opened) {
          setFocusedIndex(-1);
        }

        onOpenChange?.(opened);
      }}
      {...props}
    >
      {children}
      <Popover.Content
        onOpenAutoFocus={e => e.preventDefault()}
        className={css({
          padding: '10px',
        })}
      >
        {renderPopoverContentInner()}
      </Popover.Content>
    </Popover.Root>
  );
}

export default Object.assign(SearchPopover, {
  Trigger: Popover.Trigger,
});
