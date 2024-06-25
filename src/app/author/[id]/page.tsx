'use client';

import { getAuthorById } from '@apis/author';
import { useQuery } from '@tanstack/react-query';
import { Text } from '@radix-ui/themes';
import { VStack } from 'styled-system/jsx';

export default function AuthorPage({ params }: { params: { id: number } }) {
  const { data: author } = useQuery({
    queryKey: ['author', params.id],
    queryFn: () => getAuthorById({ id: params.id }),
    select: response => response.data,
  });

  return (
    <VStack>
      <Text>Name: {author?.name}</Text>
      <Text>Name In Kor: {author?.name_in_kor}</Text>
    </VStack>
  );
}
