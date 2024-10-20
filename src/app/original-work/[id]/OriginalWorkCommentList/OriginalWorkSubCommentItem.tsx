import { CommentServerModel } from '@models/comment';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '@atoms/user';
import {
  addOriginalWorkCommentLike,
  deleteOriginalWorkComment,
  getOriginalWorkCommentLikeCount,
  getMyOriginalWorkCommentLikeExist,
  removeOriginalWorkCommentLike,
  updateOriginalWorkComment,
} from '@apis/original-work';
import { useMutation, useQuery } from '@tanstack/react-query';
import CommentItem from '@components/common/Comment/CommentItem';
import CommentEditor from '@components/common/Comment/CommentEditor';
import { useState } from 'react';
import { UserServerModel } from '@models/user';

interface Props {
  comment: CommentServerModel;
  onDelete: () => void;
  onEdit: () => void;
  onClickReply: ({ user }: { user: UserServerModel }) => void;
}

export default function SubCommentItem({
  comment: commentProps,
  onDelete,
  onEdit,
  onClickReply,
}: Props) {
  const { id, user } = commentProps;

  const [isEditing, setIsEditing] = useState(false);

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

  return isEditing ? (
    <CommentEditor
      onSubmit={updateComment}
      onClose={() => setIsEditing(false)}
      comment={commentProps.comment}
      width="630px"
    />
  ) : (
    <CommentItem
      onClickLike={() =>
        originalWorkCommentLike?.isExist ? removeLike() : addLike()
      }
      onEdit={() => setIsEditing(true)}
      onDelete={deleteComment}
      likeCount={originalWorkCommentAllLikes}
      myLikeExist={originalWorkCommentLike?.isExist ?? false}
      user={user}
      comment={commentProps}
      width="630px"
      onClickReply={() => onClickReply({ user })}
    />
  );
}
