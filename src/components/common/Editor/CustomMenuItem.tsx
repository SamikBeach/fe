import { Avatar, Tooltip } from '@radix-ui/themes';
import { BeautifulMentionsMenuItemProps } from 'lexical-beautiful-mentions';
import { forwardRef, useMemo } from 'react';
import Highlighter from 'react-highlight-words';
import { GiSecretBook } from 'react-icons/gi';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface Props extends BeautifulMentionsMenuItemProps {
  type: 'author' | 'original-work' | 'edition';
  nameInKor?: string;
  name?: string;
  title?: string;
  titleInKor?: string;
  titleInEng?: string;
  imageUrl?: string;
  authorNameInKor?: string;
  searchValue: string;
}

const CustomMenuItem = forwardRef<HTMLLIElement, Props>(
  (
    {
      selected,
      item,
      children,
      itemValue,
      type,
      nameInKor,
      name,
      title,
      titleInKor,
      titleInEng,
      imageUrl,
      authorNameInKor,
      searchValue,
      ...restProps
    },
    ref
  ) => {
    const avatar = useMemo(() => {
      if (type === 'author') {
        return (
          <Avatar
            size="1"
            radius="full"
            src={imageUrl ?? undefined}
            fallback={nameInKor?.[0] ?? ''}
            className={css({
              borderRadius: '50%',
              width: '24px',
              height: '24px',
            })}
          />
        );
      }

      if (type === 'original-work') {
        return (
          <GiSecretBook
            className={css({
              display: 'inline',
              marginBottom: '2px',
              width: '24px',
              color: 'gray.500',
            })}
            size="24px"
          />
        );
      }

      if (type === 'edition') {
        return (
          <img
            src={imageUrl ?? undefined}
            width="24px"
            className={css({ borderRadius: '2px' })}
          />
        );
      }
    }, [imageUrl, type, nameInKor]);

    const value = useMemo(() => {
      if (type === 'author') {
        return nameInKor;
      }

      if (type === 'original-work') {
        return titleInKor;
      }

      if (type === 'edition') {
        return title;
      }
    }, [nameInKor, title, titleInKor, type]);

    const subValue = useMemo(() => {
      if (type === 'author') {
        return name;
      }

      if (type === 'original-work') {
        return titleInEng;
      }

      if (type === 'edition') {
        return;
      }
    }, [name, titleInEng, type]);

    const authorName = useMemo(() => {
      if (type === 'author') {
        return name;
      }

      if (type === 'original-work') {
        return authorNameInKor;
      }

      if (type === 'edition') {
        return authorNameInKor;
      }
    }, [name, authorNameInKor, type]);

    return (
      <li
        className={css({
          borderRadius: '4px',
          height: '44px',
          fontSize: '14px',
          px: '4px',

          _selected: {
            bgColor: 'gray.100',
          },
        })}
        ref={ref}
        {...restProps}
      >
        <HStack height="100%" width="100%" gap="10px" alignItems="center">
          {avatar}
          <VStack alignItems="start" gap="0px">
            <Tooltip
              content={`${value} ${subValue == null ? '' : `- ${subValue}`}`}
            >
              <span
                className={css({
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '540px',
                  color: 'gray.500',
                })}
              >
                <Highlighter
                  searchWords={[searchValue]}
                  textToHighlight={value ?? ''}
                  highlightClassName={css({
                    fontWeight: 'bold',
                    backgroundColor: 'transparent',
                  })}
                  className={css({
                    color: 'black',
                    lineHeight: '16px',
                  })}
                />
                {type === 'original-work' && (
                  <>
                    {' '}
                    <Highlighter
                      className={css({
                        color: 'gray.500',
                        fontSize: '11px',
                        lineHeight: '16px',
                      })}
                      searchWords={[searchValue]}
                      textToHighlight={subValue ?? ''}
                      highlightClassName={css({
                        fontWeight: 'bold',
                        backgroundColor: 'transparent',
                      })}
                    />
                  </>
                )}
              </span>
            </Tooltip>
            <Highlighter
              className={css({
                color: 'gray.500',
                fontSize: '11px',
                lineHeight: '16px',
              })}
              searchWords={[searchValue]}
              textToHighlight={authorName ?? ''}
              highlightClassName={css({
                fontWeight: 'bold',
                backgroundColor: 'transparent',
              })}
            />
          </VStack>
        </HStack>
      </li>
    );
  }
);

export default CustomMenuItem;
