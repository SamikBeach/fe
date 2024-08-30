'use client';

import OriginalWorkCommentItem from './OriginalWorkCommentItem';
import { css } from 'styled-system/css';
import { Skeleton, Text } from '@radix-ui/themes';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '@atoms/user';
import {
  addOriginalWorkComment,
  getAllOriginalWorkComments,
} from '@apis/original-work';
import CommentListBox from '@components/common/Comment/CommentListBox';
import CommentEditor from '@components/common/Comment/CommentEditor';
import { useParams } from 'next/navigation';
import OriginalWorkCommentItemSkeleton from './OriginalWorkCommentItemSkeleton';
import { isNil } from 'lodash';
import { useRef } from 'react';

export default function OriginalWorkCommentList() {
  const commentListBoxRef = useRef<HTMLDivElement>(null);

  const params = useParams();
  const originalWorkId = Number(params.id);

  const currentUser = useAtomValue(currentUserAtom);

  const {
    data: comments = [],
    isLoading,
    refetch: refetchGetAllOriginalWorkComments,
  } = useQuery({
    queryKey: ['originalWork-comment', originalWorkId],
    queryFn: () => getAllOriginalWorkComments({ originalWorkId }),
    select: response =>
      response.data.filter(comment => isNil(comment.target_comment_id)),
  });

  const { mutate: addComment } = useMutation({
    mutationFn: ({ comment }: { comment: string }) => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return addOriginalWorkComment({
        originalWorkId,
        userId: currentUser.id,
        comment,
      });
    },
    onSuccess: () => {
      refetchGetAllOriginalWorkComments();
    },
  });

  return (
    <div
      className={css({
        flex: 3,
        position: 'relative',
        height: 'calc(100vh - 64px)',
      })}
    >
      <CommentListBox ref={commentListBoxRef}>
        {isLoading ? (
          <Skeleton height="24px" width="100px" />
        ) : (
          <Text size="3" weight="medium">
            {`Comment(${comments.length})`}
          </Text>
        )}
        {isLoading ? (
          <>
            <OriginalWorkCommentItemSkeleton height="140px" />
            <OriginalWorkCommentItemSkeleton height="100px" />
            <OriginalWorkCommentItemSkeleton height="140px" />
            <OriginalWorkCommentItemSkeleton height="100px" />
            <OriginalWorkCommentItemSkeleton height="62px" />
            <OriginalWorkCommentItemSkeleton height="62px" />
          </>
        ) : (
          comments.map(comment => (
            <OriginalWorkCommentItem
              key={comment.id}
              originalWorkId={originalWorkId}
              comment={comment}
              onDelete={refetchGetAllOriginalWorkComments}
              onEdit={refetchGetAllOriginalWorkComments}
            />
          ))
        )}
      </CommentListBox>
      <div
        className={css({
          width: '800px',
          bgColor: 'white',
          padding: '20px',
          borderTop: '1px solid',
          borderColor: 'gray.200',
          zIndex: 2,
        })}
      >
        <CommentEditor
          onSubmit={({ comment }) => {
            addComment({ comment });

            commentListBoxRef.current?.scroll({ top: 99999 });
          }}
        />
      </div>
    </div>
  );
}
