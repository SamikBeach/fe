import { CommentServerModel } from '@models/comment';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '@atoms/user';
import {
  addAuthorCommentLike,
  deleteAuthorComment,
  getAuthorCommentLikeCount,
  getMyAuthorCommentLikeExist,
  removeAuthorCommentLike,
  updateAuthorComment,
} from '@apis/author';
import { useMutation, useQuery } from '@tanstack/react-query';
import CommentItem from '@components/common/Comment/CommentItem';
import CommentEditor from '@components/common/Comment/CommentEditor';
import { useState } from 'react';

interface Props {
  comment: CommentServerModel;
  onDelete: () => void;
  onEdit: () => void;
}

export default function SubCommentItem({
  comment: commentProps,
  onDelete,
  onEdit,
}: Props) {
  const { id, user } = commentProps;

  const [isEditing, setIsEditing] = useState(false);

  const currentUser = useAtomValue(currentUserAtom);

  const { mutate: addLike } = useMutation({
    mutationFn: () => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return addAuthorCommentLike({
        authorCommentId: id,
        userId: currentUser.id,
      });
    },
    onSuccess: () => {
      refetchAuthorCommentLike();
      refetchAuthorCommentAllLikes();
    },
  });

  const { mutate: removeLike } = useMutation({
    mutationFn: () => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return removeAuthorCommentLike({
        authorCommentId: id,
        userId: currentUser.id,
      });
    },
    onSuccess: () => {
      refetchAuthorCommentLike();
      refetchAuthorCommentAllLikes();
    },
  });

  const { data: authorCommentLike, refetch: refetchAuthorCommentLike } =
    useQuery({
      queryKey: ['author-comment-like', id],
      queryFn: () =>
        getMyAuthorCommentLikeExist({ authorCommentId: id, userId: 1 }),
      select: response => response.data,
    });

  const {
    data: authorCommentAllLikes = 0,
    refetch: refetchAuthorCommentAllLikes,
  } = useQuery({
    queryKey: ['author-comment-like/count', id],
    queryFn: () => getAuthorCommentLikeCount({ authorCommentId: id }),
    select: response => response.data.count,
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: () => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return deleteAuthorComment({
        commentId: id,
      });
    },
    onSuccess: () => {
      onDelete();
    },
  });

  const { mutate: updateComment } = useMutation({
    mutationFn: (param: { comment?: string }) => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return updateAuthorComment({
        commentId: id,
        comment: param.comment ?? '',
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
      comment={commentProps}
      width="630px"
    />
  ) : (
    <CommentItem
      onClickLike={() =>
        authorCommentLike?.isExist ? removeLike() : addLike()
      }
      onEdit={() => setIsEditing(true)}
      onDelete={deleteComment}
      likeCount={authorCommentAllLikes}
      myLikeExist={authorCommentLike?.isExist ?? false}
      user={user}
      comment={commentProps}
      width="630px"
    />
  );
}
