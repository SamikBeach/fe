import {
  BeautifulMentionsPlugin,
  createBeautifulMentionNode,
} from 'lexical-beautiful-mentions';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { css } from 'styled-system/css';
import CustomMenu from './CustomMenu';
import CustomMenuItem from './CustomMenuItem';
import CustomMentionComponent from './CustomMentionsComponent';

const mentionItems = {
  '@': ['Anton', 'Boris', 'Catherine', 'Dmitri', 'Elena', 'Felix', 'Gina'],
  '#': ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'],
  'due:': ['Today', 'Tomorrow', '01-01-2023'],
};

const editorConfig = {
  namespace: 'beautiful-mentions',
  onError: (error: Error) => {
    console.error(error);
  },
  nodes: [...createBeautifulMentionNode(CustomMentionComponent)],
};

export default function Editor() {
  return (
    <div
      className={css({
        position: 'relative',
        border: '1px solid',
        borderColor: 'gray.400',
        borderRadius: '4px',
      })}
    >
      <LexicalComposer initialConfig={editorConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <BeautifulMentionsPlugin // 👈 add the mentions plugin
          items={mentionItems}
          menuComponent={props => <CustomMenu {...props} />}
          menuItemComponent={props => <CustomMenuItem {...props} />}
        />
      </LexicalComposer>
    </div>
  );
}
