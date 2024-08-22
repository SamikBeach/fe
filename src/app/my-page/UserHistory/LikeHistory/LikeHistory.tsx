'use client';

import { Text } from '@radix-ui/themes';
import { VStack } from 'styled-system/jsx';
import AuthorLikeHistory from './AuthorLikeHistory';
import OriginalWorkLikeHistory from './OriginalWorkLikeHistory';
import EditionLikeHistory from './EditionLikeHistory';

export default function LikeHistory() {
  return (
    <VStack width="100%" alignItems="start" padding="20px">
      <Text weight="medium" size="4" ml="4px">
        Likes
      </Text>

      <AuthorLikeHistory />
      <OriginalWorkLikeHistory />
      <EditionLikeHistory />
    </VStack>
  );
}
