import { Avatar } from '@radix-ui/themes';
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

    const valueInKor = useMemo(() => {
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

    const valueInEng = useMemo(() => {
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

    return (
      <li
        className={css({
          borderRadius: '4px',
          height: '38px',
          fontSize: '14px',
          px: '4px',

          _selected: {
            bgColor: 'gray.100',
          },
        })}
        ref={ref}
        {...restProps}
      >
        <HStack gap="10px" alignItems="center">
          {avatar}
          <VStack alignItems="start" gap="0px">
            <Highlighter
              searchWords={[searchValue]}
              textToHighlight={valueInKor ?? ''}
              highlightClassName={css({
                fontWeight: 'bold',
                backgroundColor: 'transparent',
              })}
              className={css({
                lineHeight: '16px',
              })}
            />
            {type !== 'edition' && (
              <Highlighter
                className={css({
                  color: 'gray.500',
                  fontSize: '13px',
                  lineHeight: '16px',
                })}
                searchWords={[searchValue]}
                textToHighlight={valueInEng ?? ''}
                highlightClassName={css({
                  fontWeight: 'bold',
                  backgroundColor: 'transparent',
                })}
              />
            )}
          </VStack>
        </HStack>
      </li>
    );
  }
);

export default CustomMenuItem;
