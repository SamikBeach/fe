import { VStack } from 'styled-system/jsx';
import { CommentServerModel } from '@models/comment';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addOriginalWorkComment,
  addOriginalWorkCommentLike,
  deleteOriginalWorkComment,
  getAllOriginalWorkSubCommentsByCommentId,
  removeOriginalWorkCommentLike,
  updateOriginalWorkComment,
} from '@apis/original-work';
import { currentUserAtom } from '@atoms/user';
import { useAtomValue } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import OriginalWorkSubCommentItem from './OriginalWorkSubCommentItem';
import CommentItem from '@components/common/Comment/CommentItem';
import CommentEditor from '@components/common/Comment/CommentEditor';
import { css } from 'styled-system/css';
import { UserServerModel } from '@models/user';

interface Props {
  originalWorkId: number;
  comment: CommentServerModel;
  onUpdate: () => void;
}

export default function OriginalWorkCommentItem({
  originalWorkId,
  comment: commentProps,
  onUpdate,
}: Props) {
  const commentEditorWrapperRef = useRef<HTMLDivElement>(null);
  const commentEditorRef = useRef<HTMLDivElement>(null);

  const {
    id,
    user,
    like_count,
    comment_count,
    liked_users = [],
  } = commentProps;

  const [isEditing, setIsEditing] = useState(false);

  const [showSubComments, setShowSubComments] = useState(false);

  const currentUser = useAtomValue(currentUserAtom);

  const myLikeExist = liked_users.some(
    likedUser => likedUser.id === currentUser?.id
  );

  const [isMyLikeExist, setIsMyLikeExist] = useState(() => myLikeExist);
  const [likeCount, setLikeCount] = useState(like_count);

  useEffect(() => {
    setIsMyLikeExist(myLikeExist);
    setLikeCount(like_count);
  }, [myLikeExist, like_count]);

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
      setIsMyLikeExist(true);
      setLikeCount(prev => prev + 1);
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
      setIsMyLikeExist(false);
      setLikeCount(prev => prev - 1);
    },
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
      onUpdate();
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
      onUpdate();
    },
  });

  const [subComment, setSubComment] = useState<string | null>(null);

  const handleClickReplySubComment = ({
    user: userParam,
  }: {
    user: UserServerModel;
  }) => {
    commentEditorRef.current?.focus();

    const comment = `{"root":{"children":[{"children":[{"trigger":"@","value":"${userParam.nickname}","data":{"id":${userParam.id},"type":"user"},"type":"custom-beautifulMention","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0,"textStyle":""}],"direction":null,"format":"","indent":0,"type":"root","version":1}}`;

    setSubComment(comment);

    commentEditorWrapperRef.current?.scrollIntoView({
      block: 'center',
    });
  };

  return (
    <VStack width="100%">
      {isEditing ? (
        <CommentEditor
          onSubmit={updateComment}
          onClose={() => setIsEditing(false)}
          comment={commentProps.comment}
        />
      ) : (
        <CommentItem
          key={commentProps.comment}
          onClickLike={() => (isMyLikeExist ? removeLike() : addLike())}
          onClickToggleShowSubComments={() => {
            setShowSubComments(prev => !prev);
          }}
          onEdit={() => setIsEditing(true)}
          onDelete={deleteComment}
          likeCount={likeCount}
          subCommentCount={comment_count}
          myLikeExist={isMyLikeExist}
          isShowSubComments={showSubComments}
          user={user}
          comment={commentProps}
          width="100%"
        />
      )}
      {showSubComments &&
        subComments.map(_subComment => (
          <OriginalWorkSubCommentItem
            key={_subComment.id}
            comment={_subComment}
            onUpdate={refetchGetAllOriginalWorkSubCommentsByCommentId}
            onClickReply={handleClickReplySubComment}
          />
        ))}
      {showSubComments && (
        <div
          ref={commentEditorWrapperRef}
          className={css({ width: '100%', pl: '24px' })}
        >
          <CommentEditor
            ref={commentEditorRef}
            onSubmit={({ comment }) => {
              addComment({ comment });
              commentEditorWrapperRef.current?.scrollIntoView({
                block: 'center',
              });
            }}
            comment={subComment ?? undefined}
            setComment={setSubComment}
            width="88%"
          />
        </div>
      )}
    </VStack>
  );
}
