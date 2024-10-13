import { InitialConfigType } from '@lexical/react/LexicalComposer';
import { createBeautifulMentionNode } from 'lexical-beautiful-mentions';
import CustomMentionComponent from './CustomMentionComponent';
import { $getRoot, LexicalEditor } from 'lexical';

interface Params {
  comment?: string;
}

export function getEditorConfig({ comment }: Params): InitialConfigType {
  return {
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
    editorState: comment,
  };
}

export function getIsEditorStateEmpty(editor: LexicalEditor) {
  let isEmpty = false;
  editor.update(() => {
    const root = $getRoot();
    const children = root.getChildren();

    // 자식 노드가 없는 경우
    if (children.length === 0) {
      isEmpty = true;
    } else {
      // 자식 노드가 있어도 모든 노드가 빈 텍스트인 경우
      isEmpty = children.every(node => {
        return node.getTextContent().trim() === '';
      });
    }
  });

  return isEmpty;
}
