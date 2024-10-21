import { CommentServerModel } from '@models/comment';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '@atoms/user';
import {
  addEditionCommentLike,
  deleteEditionComment,
  removeEditionCommentLike,
  updateEditionComment,
} from '@apis/edition';
import { useMutation } from '@tanstack/react-query';
import CommentItem from '@components/common/Comment/CommentItem';
import CommentEditor from '@components/common/Comment/CommentEditor';
import { useState } from 'react';
import { UserServerModel } from '@models/user';

interface Props {
  comment: CommentServerModel;
  onUpdate: () => void;
  onClickReply: ({ user }: { user: UserServerModel }) => void;
}

export default function SubCommentItem({
  comment: commentProps,
  onUpdate,
  onClickReply,
}: Props) {
  const { id, user, like_count, liked_users = [] } = commentProps;

  const [isEditing, setIsEditing] = useState(false);

  const currentUser = useAtomValue(currentUserAtom);

  const myLikeExist = liked_users.some(
    likedUser => likedUser.id === currentUser?.id
  );

  const { mutate: addLike } = useMutation({
    mutationFn: () => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return addEditionCommentLike({
        editionCommentId: id,
        userId: currentUser.id,
      });
    },
    onSuccess: () => {
      onUpdate();
    },
  });

  const { mutate: removeLike } = useMutation({
    mutationFn: () => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return removeEditionCommentLike({
        editionCommentId: id,
        userId: currentUser.id,
      });
    },
    onSuccess: () => {
      onUpdate();
    },
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: () => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return deleteEditionComment({
        commentId: id,
      });
    },
    onSuccess: () => {
      onUpdate();
    },
  });

  const { mutate: updateComment } = useMutation({
    mutationFn: (param: { comment: string }) => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return updateEditionComment({
        commentId: id,
        comment: param.comment,
      });
    },
    onSuccess: () => {
      setIsEditing(false);
      onUpdate();
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
      onClickLike={() => (myLikeExist ? removeLike() : addLike())}
      onEdit={() => setIsEditing(true)}
      onDelete={deleteComment}
      likeCount={like_count}
      myLikeExist={myLikeExist}
      user={user}
      comment={commentProps}
      width="630px"
      onClickReply={() => onClickReply({ user })}
    />
  );
}
