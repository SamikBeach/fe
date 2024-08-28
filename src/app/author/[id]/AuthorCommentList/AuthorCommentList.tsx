import AuthorCommentItem from './AuthorCommentItem';
import { css } from 'styled-system/css';
import { Text } from '@radix-ui/themes';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '@atoms/user';
import { addAuthorComment, getAllAuthorComments } from '@apis/author';
import CommentListBox from '@components/common/Comment/CommentListBox';
import CommentEditor from '@components/common/Comment/CommentEditor';

interface Props {
  authorId: number;
}

export default function AuthorCommentList({ authorId }: Props) {
  const currentUser = useAtomValue(currentUserAtom);

  const { data: comments = [], refetch: refetchGetAllAuthorComments } =
    useQuery({
      queryKey: ['author-comment', authorId],
      queryFn: () => getAllAuthorComments({ authorId }),
      select: response => response.data,
    });

  const { mutate: addComment } = useMutation({
    mutationFn: ({ comment }: { comment: string }) => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return addAuthorComment({
        authorId,
        userId: currentUser.id,
        comment,
      });
    },
    onSuccess: () => {
      refetchGetAllAuthorComments();
    },
  });

  return (
    <div
      className={css({
        flex: 3,
        position: 'relative',
        height: 'calc(100vh - 64px)',
      })}
    >
      <CommentListBox>
        <Text size="3" weight="medium">
          {`Comment(${comments.length})`}
        </Text>
        {comments.map(comment => (
          <AuthorCommentItem
            key={comment.id}
            authorId={authorId}
            comment={comment}
            onDelete={refetchGetAllAuthorComments}
            onEdit={refetchGetAllAuthorComments}
          />
        ))}
      </CommentListBox>
      <div
        className={css({
          width: '800px',
          position: 'absolute',
          left: '0px',
          bottom: '0px',
          bgColor: 'white',
          padding: '20px',
          borderTop: '1px solid',
          borderColor: 'gray.200',
          zIndex: 2,
        })}
      >
        <CommentEditor onSubmit={addComment} />
      </div>
    </div>
  );
}
