import { HStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { OriginalWorkCommentList } from './OriginalWorkCommentList';
import { OriginalWorkInfo } from './OriginalWorkInfo';

export default function OriginalWorkPage() {
  return (
    <HStack
      alignItems="start"
      justify="center"
      className={css({ width: '100%' })}
    >
      <OriginalWorkInfo height="100%" />
      <OriginalWorkCommentList />
    </HStack>
  );
}
