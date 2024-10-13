import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { css } from 'styled-system/css';
import { HTMLProps } from 'react';
import classNames from 'classnames';

interface Props extends HTMLProps<HTMLDivElement> {}

export default function Item({ className, ...props }: Props) {
  return (
    <>
      <RichTextPlugin
        contentEditable={
          <>
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
          </>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
    </>
  );
}
