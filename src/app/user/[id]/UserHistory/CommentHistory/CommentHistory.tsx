'use client';

import { VStack } from 'styled-system/jsx';
import AuthorLikeHistory from './AuthorCommentHistory';
import OriginalWorkLikeHistory from './OriginalWorkCommentHistory';
import EditionLikeHistory from './EditionCommentHistory';

export default function CommentHistory() {
  return (
    <VStack width="100%" alignItems="start">
      <AuthorLikeHistory />
      <OriginalWorkLikeHistory />
      <EditionLikeHistory />
    </VStack>
  );
}
