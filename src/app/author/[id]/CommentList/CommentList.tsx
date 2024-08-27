import { VStack } from 'styled-system/jsx';
import CommentItem from './CommentItem';
import { css } from 'styled-system/css';
import { ScrollArea, Text } from '@radix-ui/themes';
import SubCommentItem from './SubCommentItem';
import { CommentEditor } from './CommentEditor';
import { useMutation, useQuery } from '@tanstack/react-query';
import { addAuthorComment, getAllAuthorComments } from '@apis/author';
import { useAtomValue } from 'jotai';
import { userAtom } from '@atoms/user';

interface Props {
  authorId: number;
}

export default function CommentList({ authorId }: Props) {
  const user = useAtomValue(userAtom);

  const { data: comments = [], refetch: refetchGetAllAuthorComments } =
    useQuery({
      queryKey: ['author-comment'],
      queryFn: () => getAllAuthorComments({ authorId }),
      select: response => response.data,
    });

  const { mutate: addComment } = useMutation({
    mutationFn: ({ comment }: { comment: string }) => {
      if (user === null) {
        throw new Error('User is not logged in');
      }

      return addAuthorComment({
        authorId,
        userId: user.id,
        comment,
      });
    },
    onSuccess: () => {
      refetchGetAllAuthorComments();
    },
  });

  return (
    <ScrollArea
      scrollbars="vertical"
      className={css({
        height: 'calc(100vh - 64px)',
        flex: 3,
      })}
    >
      <VStack
        alignItems="start"
        padding="40px"
        fontSize="14px"
        gap="20px"
        width="800px"
      >
        <CommentEditor onSubmit={addComment} />
        <Text size="3" weight="medium">
          {`Comment(${comments.length})`}
        </Text>
        {comments.map(comment => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
        {/* <VStack gap="10px">
          <CommentItem />
          <SubCommentItem />
        </VStack>
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem /> */}
      </VStack>
    </ScrollArea>
  );
}
