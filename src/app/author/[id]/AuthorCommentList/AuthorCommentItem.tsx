import { VStack } from 'styled-system/jsx';
import { CommentServerModel } from '@models/comment';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addAuthorComment,
  addAuthorCommentLike,
  deleteAuthorComment,
  getAllAuthorSubCommentsByCommentId,
  getAuthorCommentLikeCount,
  getMyAuthorCommentLikeExist,
  removeAuthorCommentLike,
  updateAuthorComment,
} from '@apis/author';
import { currentUserAtom } from '@atoms/user';
import { useAtomValue } from 'jotai';
import { useRef, useState } from 'react';
import AuthorSubCommentItem from './AuthorSubCommentItem';
import CommentItem from '@components/common/Comment/CommentItem';
import CommentEditor from '@components/common/Comment/CommentEditor';
import { css } from 'styled-system/css';

interface Props {
  authorId: number;
  comment: CommentServerModel;
  onDelete: () => void;
  onEdit: () => void;
}

export default function AuthorCommentItem({
  authorId,
  comment: commentProps,
  onDelete,
  onEdit,
}: Props) {
  const commentEditorWrapperRef = useRef<HTMLDivElement>(null);

  const { id, user } = commentProps;

  const [isEditing, setIsEditing] = useState(false);

  const [showSubComments, setShowSubComments] = useState(false);

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

  const {
    data: subComments = [],
    refetch: refetchGetAllAuthorSubCommentsByCommentId,
  } = useQuery({
    queryKey: ['author-comment', id],
    queryFn: () => getAllAuthorSubCommentsByCommentId({ commentId: id }),
    select: response => response.data,
  });

  const { mutate: addComment } = useMutation({
    mutationFn: (param: { comment: string }) => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return addAuthorComment({
        authorId,
        userId: currentUser.id,
        targetCommentId: id,
        comment: param.comment,
      });
    },
    onSuccess: () => {
      refetchGetAllAuthorSubCommentsByCommentId();
    },
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
    mutationFn: (param: { comment: string }) => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return updateAuthorComment({
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
            authorCommentLike?.isExist ? removeLike() : addLike()
          }
          onClickToggleShowSubComments={() => {
            setShowSubComments(prev => !prev);
          }}
          onEdit={() => setIsEditing(true)}
          onDelete={deleteComment}
          likeCount={authorCommentAllLikes}
          subCommentCount={subComments.length}
          myLikeExist={authorCommentLike?.isExist ?? false}
          isShowSubComments={showSubComments}
          user={user}
          comment={commentProps}
          width="678px"
        />
      )}
      {showSubComments &&
        subComments.map(subComment => (
          <AuthorSubCommentItem
            key={subComment.id}
            comment={subComment}
            onDelete={refetchGetAllAuthorSubCommentsByCommentId}
            onEdit={refetchGetAllAuthorSubCommentsByCommentId}
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
