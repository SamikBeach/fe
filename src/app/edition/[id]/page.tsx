import { HStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { EditionCommentList } from './EditionCommentList';
import { EditionInfo } from './EditionInfo';

export default function EditionPage() {
  return (
    <HStack
      alignItems="start"
      justify="center"
      className={css({ width: '100%', minWidth: '1240px' })}
    >
      <EditionInfo height="100%" />
      <EditionCommentList />
    </HStack>
  );
}
