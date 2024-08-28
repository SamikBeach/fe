import { CommentServerModel } from '@models/comment';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '@atoms/user';
import {
  addAuthorCommentLike,
  getAuthorCommentLikeCount,
  getMyAuthorCommentLikeExist,
  removeAuthorCommentLike,
} from '@apis/author';
import { useMutation, useQuery } from '@tanstack/react-query';
import CommentItem from '@components/common/Comment/CommentItem';

interface Props {
  comment: CommentServerModel;
}

export default function SubCommentItem({ comment: commentProps }: Props) {
  const { id, user } = commentProps;

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

  return (
    <CommentItem
      onClickLike={() =>
        authorCommentLike?.isExist ? removeLike() : addLike()
      }
      likeCount={authorCommentAllLikes}
      myLikeExist={authorCommentLike?.isExist ?? false}
      user={user}
      comment={commentProps}
      width="630px"
    />
  );
}
