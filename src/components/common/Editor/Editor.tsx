import {
  BeautifulMentionsPlugin,
  createBeautifulMentionNode,
} from 'lexical-beautiful-mentions';
import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { css } from 'styled-system/css';
import CustomMenu from './CustomMenu';
import CustomMenuItem from './CustomMenuItem';
import CustomMentionComponent from './CustomMentionComponent';

const mentionItems = {
  '@': ['Anton', 'Boris', 'Catherine', 'Dmitri', 'Elena', 'Felix', 'Gina'],
  '#': ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'],
  'due:': ['Today', 'Tomorrow', '01-01-2023'],
};

const editorConfig: InitialConfigType = {
  namespace: 'beautiful-mentions',
  onError: (error: Error) => {
    console.error(error);
  },
  nodes: [...createBeautifulMentionNode(CustomMentionComponent)],
  theme: {
    beautifulMentions: {
      '@': '@',
      '@Focused': '@focused',
      '#': '#',
      '#Focused': '#focused',
    },
  },
};

export default function Editor() {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            className={css({
              position: 'relative',
              border: '1px solid',
              borderColor: 'gray.300',
              borderRadius: '4px',
              padding: '4px',
              fontSize: '14px',

              minHeight: '60px',

              _focus: {
                borderColor: 'yellow.500',
                boxShadow: '0 0 0 1px yellow',
              },
              _active: {
                borderColor: 'yellow.500',
                boxShadow: '0 0 0 1px yellow',
              },
            })}
          />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <BeautifulMentionsPlugin
        items={mentionItems}
        menuComponent={props => <CustomMenu {...props} />}
        menuItemComponent={props => <CustomMenuItem {...props} />}
      />
    </LexicalComposer>
  );
}
