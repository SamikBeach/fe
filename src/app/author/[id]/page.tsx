'use client';

import { addAuthorComment, getAuthorById } from '@apis/author';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Spinner, TextArea } from '@radix-ui/themes';
import { HStack, VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { AuthorInfo } from './AuthorInfo';
import { CommentList } from './CommentList';
import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { userAtom } from '@atoms/user';

export default function AuthorPage({ params }: { params: { id: number } }) {
  const user = useAtomValue(userAtom);

  const { data: author, isLoading } = useQuery({
    queryKey: ['author', params.id],
    queryFn: () => getAuthorById({ id: params.id }),
    select: response => response.data,
  });

  const [comment, setComment] = useState('');

  const { mutate: addComment } = useMutation({
    mutationFn: () => {
      if (user === null) {
        throw new Error('User is not logged in');
      }

      return addAuthorComment({
        authorId: params.id,
        userId: user.id,
        comment,
      });
    },
  });

  if (isLoading) {
    return (
      <VStack height="calc(100vh - 64px)" justify="center">
        <Spinner size="3" />
      </VStack>
    );
  }

  if (author === undefined) {
    return null;
  }

  return (
    <HStack
      alignItems="start"
      justify="center"
      className={css({ width: '100%' })}
    >
      <AuthorInfo author={author} height="100%" />
      <VStack>
        <TextArea value={comment} onChange={e => setComment(e.target.value)} />
        <Button onClick={() => addComment()}>Enter</Button>
        <CommentList />
      </VStack>
    </HStack>
  );
}
