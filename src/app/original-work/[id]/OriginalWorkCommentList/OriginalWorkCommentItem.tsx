import { VStack } from 'styled-system/jsx';
import { CommentServerModel } from '@models/comment';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addOriginalWorkComment,
  addOriginalWorkCommentLike,
  deleteOriginalWorkComment,
  getAllOriginalWorkSubCommentsByCommentId,
  getOriginalWorkCommentLikeCount,
  getMyOriginalWorkCommentLikeExist,
  removeOriginalWorkCommentLike,
  updateOriginalWorkComment,
} from '@apis/original-work';
import { currentUserAtom } from '@atoms/user';
import { useAtomValue } from 'jotai';
import { useRef, useState } from 'react';
import OriginalWorkSubCommentItem from './OriginalWorkSubCommentItem';
import CommentItem from '@components/common/Comment/CommentItem';
import CommentEditor from '@components/common/Comment/CommentEditor';
import { css } from 'styled-system/css';

interface Props {
  originalWorkId: number;
  comment: CommentServerModel;
  onDelete: () => void;
  onEdit: () => void;
}

export default function OriginalWorkCommentItem({
  originalWorkId,
  comment: commentProps,
  onDelete,
  onEdit,
}: Props) {
  const commentEditorWrapperRef = useRef<HTMLDivElement>(null);

  const { id, user, comment_count } = commentProps;

  const [isEditing, setIsEditing] = useState(false);

  const [showSubComments, setShowSubComments] = useState(false);

  const currentUser = useAtomValue(currentUserAtom);

  const { mutate: addLike } = useMutation({
    mutationFn: () => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return addOriginalWorkCommentLike({
        originalWorkCommentId: id,
        userId: currentUser.id,
      });
    },
    onSuccess: () => {
      refetchOriginalWorkCommentLike();
      refetchOriginalWorkCommentAllLikes();
    },
  });

  const { mutate: removeLike } = useMutation({
    mutationFn: () => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return removeOriginalWorkCommentLike({
        originalWorkCommentId: id,
        userId: currentUser.id,
      });
    },
    onSuccess: () => {
      refetchOriginalWorkCommentLike();
      refetchOriginalWorkCommentAllLikes();
    },
  });

  const {
    data: originalWorkCommentLike,
    refetch: refetchOriginalWorkCommentLike,
  } = useQuery({
    queryKey: ['originalWork-comment-like', id],
    queryFn: () =>
      getMyOriginalWorkCommentLikeExist({
        originalWorkCommentId: id,
        userId: 1,
      }),
    select: response => response.data,
  });

  const {
    data: originalWorkCommentAllLikes = 0,
    refetch: refetchOriginalWorkCommentAllLikes,
  } = useQuery({
    queryKey: ['originalWork-comment-like/count', id],
    queryFn: () =>
      getOriginalWorkCommentLikeCount({ originalWorkCommentId: id }),
    select: response => response.data.count,
  });

  const {
    data: subComments = [],
    refetch: refetchGetAllOriginalWorkSubCommentsByCommentId,
  } = useQuery({
    queryKey: ['originalWork-comment', id],
    queryFn: () => getAllOriginalWorkSubCommentsByCommentId({ commentId: id }),
    enabled: showSubComments,
    select: response => response.data,
  });

  const { mutate: addComment } = useMutation({
    mutationFn: (param: { comment: string }) => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return addOriginalWorkComment({
        originalWorkId,
        userId: currentUser.id,
        targetCommentId: id,
        comment: param.comment,
      });
    },
    onSuccess: () => {
      refetchGetAllOriginalWorkSubCommentsByCommentId();
    },
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: () => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return deleteOriginalWorkComment({
        commentId: id,
      });
    },
    onSuccess: () => {
      onDelete();
    },
  });

  const { mutate: updateComment } = useMutation({
    mutationFn: (param: { comment: string }) => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return updateOriginalWorkComment({
        commentId: id,
        comment: param.comment,
      });
    },
    onSuccess: () => {
      setIsEditing(false);
      onEdit();
    },
  });

  return (
    <VStack width="100%">
      {isEditing ? (
        <CommentEditor
          onSubmit={updateComment}
          onClose={() => setIsEditing(false)}
          comment={commentProps}
        />
      ) : (
        <CommentItem
          onClickLike={() =>
            originalWorkCommentLike?.isExist ? removeLike() : addLike()
          }
          onClickToggleShowSubComments={() => {
            setShowSubComments(prev => !prev);
          }}
          onEdit={() => setIsEditing(true)}
          onDelete={deleteComment}
          likeCount={originalWorkCommentAllLikes}
          subCommentCount={comment_count}
          myLikeExist={originalWorkCommentLike?.isExist ?? false}
          isShowSubComments={showSubComments}
          user={user}
          comment={commentProps}
          width="678px"
        />
      )}
      {showSubComments &&
        subComments.map(subComment => (
          <OriginalWorkSubCommentItem
            key={subComment.id}
            comment={subComment}
            onDelete={refetchGetAllOriginalWorkSubCommentsByCommentId}
            onEdit={refetchGetAllOriginalWorkSubCommentsByCommentId}
          />
        ))}
      {showSubComments && (
        <div
          ref={commentEditorWrapperRef}
          className={css({ width: '100%', pl: '48px' })}
        >
          <CommentEditor
            onSubmit={({ comment }) => {
              addComment({ comment });
              commentEditorWrapperRef.current?.scrollIntoView({
                block: 'center',
              });
            }}
          />
        </div>
      )}
    </VStack>
  );
}
