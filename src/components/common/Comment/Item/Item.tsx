import { createBeautifulMentionNode } from 'lexical-beautiful-mentions';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { css } from 'styled-system/css';
import { HTMLProps } from 'react';
import classNames from 'classnames';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import CustomMentionComponent from '../common/CustomMentionComponent';

interface Props extends HTMLProps<HTMLDivElement> {
  comment?: string;
}

export default function Item({ comment, className, ...props }: Props) {
  return (
    <LexicalComposer
      initialConfig={{
        namespace: 'comment-item',
        onError: (error: Error) => {
          console.error(error);
        },
        nodes: [...createBeautifulMentionNode(CustomMentionComponent)],
        theme: {
          beautifulMentions: {
            '@': '@:item',
            '@Focused': '@focused:item',
            '#': '#:item',
            '#Focused': '#focused:item',
          },
        },
        editorState: comment,
        editable: false,
      }}
    >
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            aria-placeholder=""
            placeholder={undefined as any}
            className={classNames(
              css({
                position: 'relative',
                fontSize: '14px',

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
    </LexicalComposer>
  );
}
