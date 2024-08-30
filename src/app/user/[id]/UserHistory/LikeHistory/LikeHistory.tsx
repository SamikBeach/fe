'use client';

import { Text } from '@radix-ui/themes';
import { VStack } from 'styled-system/jsx';
import AuthorLikeHistory from './AuthorLikeHistory';
import OriginalWorkLikeHistory from './OriginalWorkLikeHistory';
import EditionLikeHistory from './EditionLikeHistory';
import { useQuery } from '@tanstack/react-query';
import { getUserLikes } from '@apis/user';
import { useParams } from 'next/navigation';

export default function LikeHistory() {
  const params = useParams();
  const userId = Number(params.id);

  const { data: userLikes } = useQuery({
    queryKey: ['user/like'],
    queryFn: () => getUserLikes({ userId }),
    select: response => response.data,
  });

  console.log({ userLikes });

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
