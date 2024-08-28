import { VStack } from 'styled-system/jsx';
import CommentItem from './CommentItem';
import { css } from 'styled-system/css';
import { ScrollArea, Text } from '@radix-ui/themes';
import SubCommentItem from './SubCommentItem';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '@atoms/user';
import { CommentEditor } from './CommentEditor';
import { addAuthorComment, getAllAuthorComments } from '@apis/author';

interface Props {
  authorId: number;
}

export default function CommentList({ authorId }: Props) {
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
      <ScrollArea
        scrollbars="vertical"
        className={css({ height: 'calc(100vh - 168px)' })}
      >
        <VStack
          alignItems="start"
          fontSize="14px"
          gap="20px"
          width="800px"
          padding="40px"
        >
          <Text size="3" weight="medium">
            {`Comment(${comments.length})`}
          </Text>
          {comments.map(comment => (
            <CommentItem
              key={comment.id}
              authorId={authorId}
              comment={comment}
            />
          ))}
        </VStack>
      </ScrollArea>
      <CommentEditor onSubmit={addComment} />
    </div>
  );
}
