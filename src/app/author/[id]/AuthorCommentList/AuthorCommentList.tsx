'use client';

import AuthorCommentItem from './AuthorCommentItem';
import { css } from 'styled-system/css';
import { Skeleton, Text } from '@radix-ui/themes';
import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '@atoms/user';
import {
  SearchAuthorCommentsResponse,
  addAuthorComment,
  getAllAuthorComments,
  searchAuthorComments,
} from '@apis/author';
import CommentListBox from '@components/common/Comment/CommentListBox';
import CommentEditor from '@components/common/Comment/CommentEditor';
import { useParams } from 'next/navigation';
import AuthorCommentItemSkeleton from './AuthorCommentItemSkkeleton';
import { isNil } from 'lodash';
import { useMemo, useRef } from 'react';
import { HStack } from 'styled-system/jsx';
import AuthorCommentSortDropdown from './AuthorCommentSortDropdown';
import { AxiosResponse } from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function AuthorCommentList() {
  const commentListBoxRef = useRef<HTMLDivElement>(null);

  const params = useParams();
  const authorId = Number(params.id);

  const currentUser = useAtomValue(currentUserAtom);

  const {
    data,
    fetchNextPage,
    isLoading,
    refetch: refetchSearchAuthorComments,
  } = useInfiniteQuery<AxiosResponse<SearchAuthorCommentsResponse>>({
    queryKey: ['author/search', authorId],
    queryFn: async ({ pageParam = 0 }) => {
      return await searchAuthorComments({
        where__id__more_than: pageParam as number,
        // order__id: 'DESC',
        take: 10,
        authorId,
      });
    },
    initialPageParam: 0,
    getNextPageParam: param => {
      return param.data.cursor.after;
    },
    placeholderData: keepPreviousData,
    refetchOnMount: 'always',
  });

  const comments = useMemo(
    () => data?.pages?.flatMap(page => page.data.data) ?? [],
    [data]
  );

  console.log({ comments });

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
      refetchSearchAuthorComments();
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
      <CommentListBox ref={commentListBoxRef}>
        <HStack justify="space-between" width="100%">
          {isLoading ? (
            <Skeleton height="24px" width="100px" />
          ) : (
            <Text size="3" weight="medium">
              {`Comment(${comments.length})`}
            </Text>
          )}
          <AuthorCommentSortDropdown />
        </HStack>
        {isLoading ? (
          <>
            <AuthorCommentItemSkeleton height="140px" />
            <AuthorCommentItemSkeleton height="100px" />
            <AuthorCommentItemSkeleton height="140px" />
            <AuthorCommentItemSkeleton height="100px" />
            <AuthorCommentItemSkeleton height="62px" />
            <AuthorCommentItemSkeleton height="62px" />
          </>
        ) : (
          comments.map(comment => (
            <AuthorCommentItem
              key={comment.id}
              authorId={authorId}
              comment={comment}
              onDelete={refetchSearchAuthorComments}
              onEdit={refetchSearchAuthorComments}
            />
          ))
        )}
      </CommentListBox>
      <div
        className={css({
          width: '800px',

          bgColor: 'white',
          padding: '20px',
          borderTop: '1px solid',
          borderColor: 'gray.200',
          zIndex: 2,
        })}
      >
        <CommentEditor
          onSubmit={({ comment }) => {
            addComment({ comment });

            commentListBoxRef.current?.scroll({ top: 99999 });
          }}
        />
      </div>
    </div>
  );
}
