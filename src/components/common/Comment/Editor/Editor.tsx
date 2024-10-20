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
import { HTMLProps, forwardRef, useCallback } from 'react';
import { EditorState } from 'lexical';
import classNames from 'classnames';
import { useSetAtom } from 'jotai';
import { searchUserValueAtom, searchValueAtom } from '../atoms';

interface Props extends HTMLProps<HTMLDivElement> {
  comment?: string;
  setComment: (comment?: string) => void;
  mentionItems: Record<string, BeautifulMentionsItem[]>;
}

const Editor = forwardRef<HTMLDivElement, Props>(
  (
    { comment, setComment, className, placeholder, mentionItems, ...props },
    ref
  ) => {
    const setSearchValue = useSetAtom(searchValueAtom);
    const setSearchUserValue = useSetAtom(searchUserValueAtom);

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
              ref={ref}
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
                  minHeight: '54px',
                  maxHeight: '300px',
                  overflowY: 'auto',

                  _scrollbar: {
                    width: '5px',
                    borderRadius: '3px',
                  },

                  _scrollbarTrack: {
                    width: '5px',
                    backgroundColor: 'gray.100',
                    mr: '80px',
                  },

                  _scrollbarThumb: {
                    width: '5px',
                    backgroundColor: 'gray.300',
                    borderRadius: '6px',
                  },

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
          menuItemComponent={CustomMenuItem}
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
);

export default Editor;
