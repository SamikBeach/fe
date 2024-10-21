import { VStack } from 'styled-system/jsx';
import { CommentServerModel } from '@models/comment';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  addEditionComment,
  addEditionCommentLike,
  deleteEditionComment,
  getAllEditionSubCommentsByCommentId,
  removeEditionCommentLike,
  updateEditionComment,
} from '@apis/edition';
import { currentUserAtom } from '@atoms/user';
import { useAtomValue } from 'jotai';
import { useRef, useState } from 'react';
import EditionSubCommentItem from './EditionSubCommentItem';
import CommentItem from '@components/common/Comment/CommentItem';
import CommentEditor from '@components/common/Comment/CommentEditor';
import { css } from 'styled-system/css';
import { UserServerModel } from '@models/user';

interface Props {
  editionId: number;
  comment: CommentServerModel;
  onUpdate: () => void;
}

export default function EditionCommentItem({
  editionId,
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

  const {
    data: subComments = [],
    refetch: refetchGetAllEditionSubCommentsByCommentId,
  } = useQuery({
    queryKey: ['edition-comment', id],
    queryFn: () => getAllEditionSubCommentsByCommentId({ commentId: id }),
    enabled: showSubComments,
    select: response => response.data,
  });

  const { mutate: addComment } = useMutation({
    mutationFn: (param: { comment: string }) => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return addEditionComment({
        editionId,
        userId: currentUser.id,
        targetCommentId: id,
        comment: param.comment,
      });
    },
    onSuccess: () => {
      refetchGetAllEditionSubCommentsByCommentId();
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
          onClickLike={() => (myLikeExist ? removeLike() : addLike())}
          onClickToggleShowSubComments={() => {
            setShowSubComments(prev => !prev);
          }}
          onEdit={() => setIsEditing(true)}
          onDelete={deleteComment}
          likeCount={like_count}
          subCommentCount={comment_count}
          myLikeExist={myLikeExist}
          isShowSubComments={showSubComments}
          user={user}
          comment={commentProps}
          width="678px"
        />
      )}
      {showSubComments &&
        subComments.map(_subComment => (
          <EditionSubCommentItem
            key={_subComment.id}
            comment={_subComment}
            onUpdate={refetchGetAllEditionSubCommentsByCommentId}
            onClickReply={handleClickReplySubComment}
          />
        ))}
      {showSubComments && (
        <div
          ref={commentEditorWrapperRef}
          className={css({ width: '100%', pl: '48px' })}
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
          />
        </div>
      )}
    </VStack>
  );
}
