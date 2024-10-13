import {
  BeautifulMentionsItem,
  BeautifulMentionsPlugin,
} from 'lexical-beautiful-mentions';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { css } from 'styled-system/css';
import CustomMenu from './CustomMenu';
import CustomMenuItem from './CustomMenuItem';
import { HTMLProps, useCallback } from 'react';
import { EditorState } from 'lexical';
import classNames from 'classnames';

interface Props extends HTMLProps<HTMLDivElement> {
  comment?: string;
  setComment: (comment?: string) => void;
  mentionItems: Record<string, BeautifulMentionsItem[]>;
  searchValue: string | null;
  setSearchValue: (value: string | null) => void;
  searchUserValue: string | null;
  setSearchUserValue: (value: string | null) => void;
}

export default function Editor({
  comment,
  setComment,
  searchValue,
  setSearchValue,
  searchUserValue,
  setSearchUserValue,
  className,
  placeholder,
  mentionItems,
  ...props
}: Props) {
  const handleChange = useCallback(
    (editorState: EditorState) => {
      setComment(JSON.stringify(editorState.toJSON()));
    },
    [setComment]
  );

  return (
    <>
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            autoFocus
            aria-placeholder={placeholder}
            placeholder={
              (
                <div
                  className={css({
                    color: 'gray.500',
                    position: 'absolute',
                    top: '0',
                    left: '6px',
                    padding: '4px',
                    pointerEvents: 'none',
                    fontSize: '14px',
                  })}
                >
                  {placeholder}
                </div>
              ) as any
            }
            className={classNames(
              css({
                position: 'relative',
                border: '1px solid',
                borderColor: 'gray.300',
                borderRadius: '4px',
                py: '4px',
                px: '8px',
                paddingRight: '90px',
                fontSize: '14px',
                minHeight: '60px',

                _focus: {
                  outlineColor: 'gray.400',
                },
              }),
              className
            )}
            {...props}
          />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
      <OnChangePlugin onChange={handleChange} />
      <BeautifulMentionsPlugin
        triggers={['@', '#']}
        menuComponent={CustomMenu}
        menuItemComponent={prop => (
          <CustomMenuItem
            searchValue={searchValue}
            searchUserValue={searchUserValue}
            {...prop}
          />
        )}
        onSearch={(
          trigger: string,
          queryString?: string | undefined | null
        ) => {
          if (trigger === '@') {
            setSearchUserValue(queryString ?? null);

            return new Promise(resolve => {
              resolve(
                mentionItems[trigger].filter(item => {
                  if (typeof item === 'string') {
                    throw new Error('Invalid mention item');
                  }

                  if (item.type === 'user') {
                    return item.value;
                  }
                })
              );
            });
          }

          setSearchValue(queryString ?? null);

          const isKorean = (queryString ?? '').charCodeAt(0) > 255;

          return new Promise(resolve => {
            resolve(
              mentionItems[trigger].filter(item => {
                if (typeof item === 'string') {
                  throw new Error('Invalid mention item');
                }

                if (item.type === 'author') {
                  return isKorean ? item.nameInKor : item.name;
                }

                if (item.type === 'original-work') {
                  return isKorean ? item.titleInKor : item.titleInEng;
                }

                if (item.type === 'edition') {
                  return item.title;
                }
              })
            );
          });
        }}
      />
    </>
  );
}
