'use client';

import { VStack } from 'styled-system/jsx';
import AuthorLikeHistory from './AuthorLikeHistory';
import OriginalWorkLikeHistory from './OriginalWorkLikeHistory';
import EditionLikeHistory from './EditionLikeHistory';

export default function CommentHistory() {
  return (
    <VStack width="100%" alignItems="start">
      <AuthorLikeHistory />
      <OriginalWorkLikeHistory />
      <EditionLikeHistory />
    </VStack>
  );
}
