import { searchAuthors } from '@apis/author';
import { searchEditions } from '@apis/edition';
import { searchOriginalWorks } from '@apis/original-work';
import { Avatar, Popover, Spinner, Text, Tooltip } from '@radix-ui/themes';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ComponentProps, Fragment, useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { GiSecretBook } from 'react-icons/gi';
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

  const locale = useLocale();

  const t = useTranslations('Common');

  const [focusedIndex, setFocusedIndex] = useState(-1);

  const { data: authors = [], isLoading: isLoadingAuthors } = useQuery({
    queryKey: ['author', searchValue],
    queryFn: () => searchAuthors({ keyword: searchValue, limit: 5, locale }),
    enabled: searchValue !== '',
    select: response => response.data.data,
    placeholderData: keepPreviousData,
  });

  const { data: originalWorks = [], isLoading: isLoadingOriginalWorks } =
    useQuery({
      queryKey: ['original-work', searchValue],
      queryFn: () =>
        searchOriginalWorks({ keyword: searchValue, limit: 5, locale }),
      enabled: searchValue !== '',
      select: response => response.data.data,
      placeholderData: keepPreviousData,
    });

  const { data: editions = [], isLoading: isLoadingEditions } = useQuery({
    queryKey: ['edition', searchValue],
    queryFn: () => searchEditions({ keyword: searchValue, limit: 5 }),
    enabled: searchValue !== '',
    select: response => response.data.data,
    placeholderData: keepPreviousData,
  });

  const isLoading =
    isLoadingAuthors || isLoadingOriginalWorks || isLoadingEditions;

  const hasAuthors = authors.length > 0;
  const hasOriginalWorks = originalWorks.length > 0;
  const hasEditions = editions.length > 0;
  const hasResults = hasAuthors || hasOriginalWorks;
  const resultCount = authors.length + originalWorks.length + editions.length;

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
            : focusedIndex < authors.length + originalWorks.length
              ? `/original-work/${
                  originalWorks[focusedIndex - authors.length].id
                }`
              : `/edition/${editions[focusedIndex - authors.length - originalWorks.length].id}`
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
    editions,
  ]);

  const renderPopoverContentInner = () => {
    if (isLoading || searchValue === '') {
      return (
        <VStack width="430px" height="388px" justify="center">
          <Spinner />
        </VStack>
      );
    }

    if (!hasResults) {
      return (
        <VStack width="430px" height="388px" justify="center">
          <Text>{t('no_result')}</Text>
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
              {t('authors')}
            </Text>
            {authors.map((author, index) => (
              <HStack
                key={index}
                gap="10px"
                className={css({
                  width: '430px',
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
                <HStack gap="4px">
                  <Highlighter
                    searchWords={[searchValue]}
                    textToHighlight={
                      locale === 'ko' ? author.name_in_kor : author.name
                    }
                    highlightClassName={css({
                      fontWeight: 'bold',
                      backgroundColor: 'transparent',
                    })}
                  />
                  {locale === 'ko' && (
                    <Highlighter
                      className={css({ color: 'gray.500', fontSize: '13px' })}
                      searchWords={[searchValue]}
                      textToHighlight={author.name}
                      highlightClassName={css({
                        fontWeight: 'bold',
                        backgroundColor: 'transparent',
                      })}
                    />
                  )}
                </HStack>
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
              {t('original_works')}
            </Text>
            {originalWorks.map((originalWork, index) => (
              <HStack
                key={index}
                gap="10px"
                className={css({
                  width: '430px',
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
                  router.push(`/original-work/${originalWork.id}`);
                  onOpenChange?.(false);
                }}
              >
                <GiSecretBook
                  className={css({
                    display: 'inline',
                    marginBottom: '2px',
                    cursor: 'pointer',
                    color: 'gray.500',
                    minWidth: '24px',
                  })}
                  size="24px"
                />{' '}
                <VStack alignItems="start" gap="0">
                  <Tooltip
                    content={`${
                      locale === 'ko'
                        ? originalWork.title_in_kor
                        : originalWork.title
                    } - ${originalWork.title_in_eng}`}
                  >
                    <span
                      className={css({
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '380px',
                      })}
                    >
                      <Highlighter
                        searchWords={[searchValue]}
                        textToHighlight={
                          locale === 'ko'
                            ? originalWork.title_in_kor ?? ''
                            : originalWork.title ?? ''
                        }
                        className={css({
                          lineHeight: '17px',
                        })}
                        highlightClassName={css({
                          fontWeight: 'bold',
                          backgroundColor: 'transparent',
                        })}
                      />
                      <Highlighter
                        searchWords={[searchValue]}
                        textToHighlight={originalWork.title_in_eng ?? ''}
                        className={css({
                          color: 'gray.500',
                          fontSize: '11px',
                          lineHeight: '16.5px',
                          ml: '4px',
                        })}
                        highlightClassName={css({
                          fontWeight: 'bold',
                          backgroundColor: 'transparent',
                        })}
                      />
                    </span>
                  </Tooltip>

                  <span
                    className={css({
                      color: 'gray.500',
                      fontSize: '11px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '380px',
                    })}
                  >
                    <Highlighter
                      searchWords={[searchValue]}
                      textToHighlight={
                        locale === 'ko'
                          ? originalWork.author.name_in_kor ?? ''
                          : originalWork.author.name ?? ''
                      }
                      highlightClassName={css({
                        fontWeight: 'bold',
                        backgroundColor: 'transparent',
                      })}
                    />
                  </span>
                </VStack>
              </HStack>
            ))}
          </>
        )}

        {hasEditions && (
          <>
            <Text
              color="gray"
              size="2"
              className={css({ px: '11px', py: '14px' })}
            >
              {t('editions')}
            </Text>
            {editions.map((edition, index) => (
              <HStack
                key={index}
                gap="10px"
                className={css({
                  width: '430px',
                  py: '4px',
                  px: '8px',
                  background:
                    focusedIndex ===
                    index + authors.length + originalWorks.length
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
                  router.push(`/edition/${edition.id}`);
                  onOpenChange?.(false);
                }}
              >
                <img
                  src={edition.image_url ?? undefined}
                  width="24px"
                  className={css({ borderRadius: '2px' })}
                />
                <VStack alignItems="start" gap="0">
                  <Tooltip
                    content={
                      <>
                        <Text>{edition.title}</Text>{' '}
                        {edition.original_works.map(originalWork => (
                          <Fragment key={originalWork.id}>
                            <GiSecretBook
                              className={css({
                                display: 'inline',
                                marginBottom: '2px',
                                width: '12px',
                              })}
                              size="12px"
                            />
                            <Text>{originalWork.title_in_kor}</Text>
                          </Fragment>
                        ))}
                      </>
                    }
                  >
                    <span
                      className={css({
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '380px',
                      })}
                    >
                      <Highlighter
                        searchWords={[searchValue]}
                        textToHighlight={edition.title ?? ''}
                        highlightClassName={css({
                          fontWeight: 'bold',
                          backgroundColor: 'transparent',
                        })}
                        className={css({
                          lineHeight: '19px',
                        })}
                      />{' '}
                      {edition.original_works.map(originalWork => (
                        <span
                          key={originalWork.id}
                          className={css({ mr: '4px' })}
                        >
                          <GiSecretBook
                            className={css({
                              display: 'inline',
                              marginBottom: '2px',
                              cursor: 'pointer',
                              color: 'gray.500',
                              width: '12px',
                            })}
                            size="12px"
                          />
                          <Highlighter
                            searchWords={[searchValue]}
                            textToHighlight={originalWork.title_in_kor ?? ''}
                            className={css({
                              color: 'gray.500',
                              fontSize: '11px',
                            })}
                            highlightClassName={css({
                              fontWeight: 'bold',
                              backgroundColor: 'transparent',
                            })}
                          />
                        </span>
                      ))}
                    </span>
                  </Tooltip>

                  <Highlighter
                    searchWords={[searchValue]}
                    textToHighlight={
                      locale === 'ko'
                        ? edition.author.name_in_kor ?? ''
                        : edition.author.name ?? ''
                    }
                    className={css({
                      color: 'gray.500',
                      fontSize: '11px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '380px',
                    })}
                    highlightClassName={css({
                      fontWeight: 'bold',
                      backgroundColor: 'transparent',
                    })}
                  />
                </VStack>
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
