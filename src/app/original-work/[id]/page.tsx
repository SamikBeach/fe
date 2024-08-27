'use client';

import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@radix-ui/themes';
import { HStack, VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { OriginalWorkInfo } from './OriginalWorkInfo';
import { CommentList } from './CommentList';
import { getOriginalWorkById } from '@apis/original-work';

export default function OriginalWorkPage({
  params,
}: {
  params: { id: number };
}) {
  const { data: originalWork, isLoading } = useQuery({
    queryKey: ['original-work', params.id],
    queryFn: () => getOriginalWorkById({ id: params.id }),
    select: response => response.data,
  });

  if (isLoading) {
    return (
      <VStack height="calc(100vh - 64px)" justify="center">
        <Spinner size="3" />
      </VStack>
    );
  }

  if (originalWork === undefined) {
    return null;
  }

  return (
    <HStack
      alignItems="start"
      justify="center"
      className={css({ width: '100%' })}
    >
      <OriginalWorkInfo originalWork={originalWork} height="100%" />
      <CommentList />
    </HStack>
  );
}
