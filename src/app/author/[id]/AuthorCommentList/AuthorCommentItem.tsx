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
} from '@apis/author';
import { currentUserAtom } from '@atoms/user';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import AuthorSubCommentItem from './AuthorSubCommentItem';
import CommentItem from '@components/common/Comment/CommentItem';
import SubCommentEditor from '@components/common/Comment/SubCommentEditor';

interface Props {
  authorId: number;
  comment: CommentServerModel;
  onDelete: () => void;
}

export default function AuthorCommentItem({
  authorId,
  comment: commentProps,
  onDelete,
}: Props) {
  const { id, user } = commentProps;

  const [showSubComments, setShowSubComments] = useState(false);
  const [showReplyEditor, setShowReplyEditor] = useState(false);

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

  return (
    <VStack width="100%">
      <CommentItem
        onClickLike={() =>
          authorCommentLike?.isExist ? removeLike() : addLike()
        }
        onClickReply={() => setShowReplyEditor(prev => !prev)}
        onClickToggleShowSubComments={() => {
          setShowSubComments(prev => !prev);
          setShowReplyEditor(prev => !prev);
        }}
        onDelete={deleteComment}
        likeCount={authorCommentAllLikes}
        subCommentCount={subComments.length}
        myLikeExist={authorCommentLike?.isExist ?? false}
        isShowSubComments={showSubComments}
        user={user}
        comment={commentProps}
        width="678px"
      />
      {showSubComments &&
        subComments.map(subComment => (
          <AuthorSubCommentItem key={subComment.id} comment={subComment} />
        ))}
      {showReplyEditor && (
        <SubCommentEditor
          onSubmit={({ comment: cmt }) => {
            addComment({ comment: cmt });

            setShowSubComments(true);
          }}
        />
      )}
    </VStack>
  );
}
