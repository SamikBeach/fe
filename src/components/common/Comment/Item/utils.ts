import { createBeautifulMentionNode } from 'lexical-beautiful-mentions';
import CustomMentionComponent from '../common/CustomMentionComponent';
import { InitialConfigType } from '@lexical/react/LexicalComposer';

interface Params {
  comment?: string;
}

export function getEditorConfig({ comment }: Params): InitialConfigType {
  return {
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
  };
}
