import { InitialConfigType } from '@lexical/react/LexicalComposer';
import { createBeautifulMentionNode } from 'lexical-beautiful-mentions';
import CustomMentionComponent from './CustomMentionComponent';

export const editorConfig: InitialConfigType = {
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
