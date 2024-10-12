import {
  BeautifulMentionsItem,
  BeautifulMentionsPlugin,
  createBeautifulMentionNode,
} from 'lexical-beautiful-mentions';
import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { css } from 'styled-system/css';
import CustomMenu from './CustomMenu';
import CustomMenuItem from './CustomMenuItem';
import CustomMentionComponent from './CustomMentionComponent';
import {
  ComponentProps,
  ComponentPropsWithRef,
  ForwardRefExoticComponent,
  HTMLProps,
  RefAttributes,
  useCallback,
  useRef,
  useState,
} from 'react';
import { $getRoot, EditorState } from 'lexical';
import classNames from 'classnames';
import { editorConfig } from './editorConfig';

interface Props extends Omit<HTMLProps<HTMLDivElement>, 'value'> {
  mentionItems: Record<string, BeautifulMentionsItem[]>;
  value: string | null;
  setValue: (value: string | null) => void;
}

export default function Editor({
  value,
  setValue,
  className,
  mentionItems,
  ...props
}: Props) {
  const handleChange = useCallback(
    (editorState: EditorState) => {
      editorState.read(() => {
        const textContent = $getRoot().__cachedText;

        setValue(textContent);
      });
    },
    [setValue]
  );

  console.log({ mentionItems });

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            aria-placeholder="Write something..."
            placeholder={
              (
                <div
                  className={css({
                    color: 'gray.500',
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    padding: '4px',
                    pointerEvents: 'none',
                  })}
                >
                  Write something...
                </div>
              ) as any
            }
            className={classNames(
              css({
                position: 'relative',
                border: '1px solid',
                borderColor: 'gray.300',
                borderRadius: '4px',
                padding: '4px',
                fontSize: '14px',

                minHeight: '60px',
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
          <CustomMenuItem searchValue={value} {...prop} />
        )}
        onSearch={(
          trigger: string,
          queryString?: string | undefined | null
        ) => {
          setValue(queryString ?? null);

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
    </LexicalComposer>
  );
}
