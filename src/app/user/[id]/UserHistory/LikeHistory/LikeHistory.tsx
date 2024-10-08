'use client';

import { VStack } from 'styled-system/jsx';
import AuthorLikeHistory from './AuthorLikeHistory';
import OriginalWorkLikeHistory from './OriginalWorkLikeHistory';
import EditionLikeHistory from './EditionLikeHistory';

export default function LikeHistory() {
  return (
    <VStack width="100%" alignItems="start">
      <AuthorLikeHistory />
      <OriginalWorkLikeHistory />
      <EditionLikeHistory />
    </VStack>
  );
}
