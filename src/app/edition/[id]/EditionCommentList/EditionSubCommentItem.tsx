import { CommentServerModel } from '@models/comment';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '@atoms/user';
import {
  addEditionCommentLike,
  deleteEditionComment,
  getEditionCommentLikeCount,
  getMyEditionCommentLikeExist,
  removeEditionCommentLike,
  updateEditionComment,
} from '@apis/edition';
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

      return addEditionCommentLike({
        editionCommentId: id,
        userId: currentUser.id,
      });
    },
    onSuccess: () => {
      refetchEditionCommentLike();
      refetchEditionCommentAllLikes();
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
      refetchEditionCommentLike();
      refetchEditionCommentAllLikes();
    },
  });

  const { data: editionCommentLike, refetch: refetchEditionCommentLike } =
    useQuery({
      queryKey: ['edition-comment-like', id],
      queryFn: () =>
        getMyEditionCommentLikeExist({
          editionCommentId: id,
          userId: 1,
        }),
      select: response => response.data,
    });

  const {
    data: editionCommentAllLikes = 0,
    refetch: refetchEditionCommentAllLikes,
  } = useQuery({
    queryKey: ['edition-comment-like/count', id],
    queryFn: () => getEditionCommentLikeCount({ editionCommentId: id }),
    select: response => response.data.count,
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
      onDelete();
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
        editionCommentLike?.isExist ? removeLike() : addLike()
      }
      onEdit={() => setIsEditing(true)}
      onDelete={deleteComment}
      likeCount={editionCommentAllLikes}
      myLikeExist={editionCommentLike?.isExist ?? false}
      user={user}
      comment={commentProps}
      width="630px"
    />
  );
}
