import { HStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { AuthorInfo } from './AuthorInfo';
import { AuthorCommentList } from './AuthorCommentList';

export default function AuthorPage() {
  return (
    <HStack
      alignItems="start"
      justify="center"
      className={css({ width: '100%', minWidth: '1240px' })}
    >
      <AuthorInfo height="100%" />
      <AuthorCommentList />
    </HStack>
  );
}
