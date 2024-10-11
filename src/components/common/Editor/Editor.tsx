import { BeautifulMentionNode } from 'lexical-beautiful-mentions';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { css } from 'styled-system/css';
import NewMentionsPlugin from './plugins/MentionsPlugin';

const editorConfig = {
  namespace: 'beautiful-mentions',
  onError: (error: Error) => {
    console.error(error);
  },
  nodes: [BeautifulMentionNode], // 👈 register the mention node
};

export default function Editor() {
  return (
    <div
      className={css({
        position: 'relative',
        border: '1px solid',
        borderColor: 'gray.400',
        borderRadius: '4px',

        _focus: {
          borderColor: 'gray.600',
          outline: 'none',
        },
        _active: {
          borderColor: 'gray.600',
          outline: 'none',
        },
      })}
    >
      <LexicalComposer initialConfig={editorConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <NewMentionsPlugin />
      </LexicalComposer>
    </div>
  );
}
