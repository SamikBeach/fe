'use client';

import OriginalWorkCommentItem from './OriginalWorkCommentItem';
import { css } from 'styled-system/css';
import { Skeleton, Text } from '@radix-ui/themes';
import {
  keepPreviousData,
  useInfiniteQuery,
  useMutation,
} from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { currentUserAtom } from '@atoms/user';
import {
  SearchOriginalWorkCommentsResponse,
  addOriginalWorkComment,
  searchOriginalWorkComments,
} from '@apis/original-work';
import CommentListBox from '@components/common/Comment/CommentListBox';
import CommentEditor from '@components/common/Comment/CommentEditor';
import { useParams } from 'next/navigation';
import OriginalWorkCommentItemSkeleton from './OriginalWorkCommentItemSkeleton';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { HStack } from 'styled-system/jsx';
import OriginalWorkCommentSortDropdown from './OriginalWorkCommentSortDropdown';
import { AxiosResponse } from 'axios';
import { originalWorkCommentSortAtom } from '@atoms/sort';
import { useTranslations } from 'next-intl';
import CommentListEmpty from '@components/common/Comment/CommentListEmpty';

interface Props {
  isMobile?: boolean;
}

export default function OriginalWorkCommentList({ isMobile = false }: Props) {
  const t = useTranslations('Common');

  const commentListBoxRef = useRef<HTMLDivElement>(null);

  const params = useParams();
  const originalWorkId = Number(params.id);

  const currentUser = useAtomValue(currentUserAtom);

  const authorCommentSort = useAtomValue(originalWorkCommentSortAtom);

  const {
    data,
    fetchNextPage,
    isLoading,
    isFetching,
    refetch: refetchSearchOriginalWorkComments,
  } = useInfiniteQuery<AxiosResponse<SearchOriginalWorkCommentsResponse>>({
    queryKey: ['original-work-comment/search', authorCommentSort],
    queryFn: async ({ pageParam = 1 }) => {
      return await searchOriginalWorkComments({
        originalWorkId,
        sort: authorCommentSort,
        page: pageParam as number,
      });
    },
    initialPageParam: 1,
    getNextPageParam: param => {
      const nextParam = param.data.links.next;
      const query = nextParam?.split('?')[1];
      const pageParam = query
        ?.split('&')
        .find(q => q.startsWith('page'))
        ?.split('=')[1];

      return pageParam;
    },
    refetchOnMount: 'always',
    placeholderData: keepPreviousData,
  });

  const comments = useMemo(
    () => data?.pages?.flatMap(page => page.data.data) ?? [],
    [data]
  );

  const hasComments = comments.length > 0;

  const { mutate: addComment } = useMutation({
    mutationFn: ({ comment }: { comment: string }) => {
      if (currentUser === null) {
        throw new Error('User is not logged in');
      }

      return addOriginalWorkComment({
        originalWorkId,
        userId: currentUser.id,
        comment,
      });
    },
    onSuccess: () => {
      refetchSearchOriginalWorkComments();
    },
  });

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        //once the user has scrolled within 500px of the bottom of the table, fetch more data if we can
        if (scrollHeight - scrollTop - clientHeight < 300 && !isFetching) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching]
  );

  useEffect(() => {
    fetchMoreOnBottomReached(commentListBoxRef.current);
  }, [fetchMoreOnBottomReached]);

  return (
    <div
      className={
        isMobile
          ? css({
              mt: '176px',
              mb: '100px',
              width: '100%',
            })
          : css({
              flex: 3,
              position: 'relative',
              height: 'calc(100vh - 64px)',
            })
      }
    >
      <CommentListBox
        ref={commentListBoxRef}
        onScroll={e => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
        isMobile={isMobile}
      >
        {!isMobile && (
          <HStack justify="space-between" width="100%">
            {isLoading ? (
              <Skeleton height="24px" width="100px" />
            ) : (
              <Text size="3" weight="medium">
                {t('comment', { count: comments.length })}
              </Text>
            )}
            <OriginalWorkCommentSortDropdown />
          </HStack>
        )}
        {isLoading ? (
          <>
            <OriginalWorkCommentItemSkeleton height="140px" />
            <OriginalWorkCommentItemSkeleton height="100px" />
            <OriginalWorkCommentItemSkeleton height="140px" />
            <OriginalWorkCommentItemSkeleton height="100px" />
            <OriginalWorkCommentItemSkeleton height="62px" />
            <OriginalWorkCommentItemSkeleton height="62px" />
          </>
        ) : hasComments ? (
          comments.map(comment => (
            <OriginalWorkCommentItem
              key={comment.id}
              originalWorkId={originalWorkId}
              comment={comment}
              onUpdate={refetchSearchOriginalWorkComments}
            />
          ))
        ) : (
          <CommentListEmpty />
        )}
      </CommentListBox>
      <div
        className={css({
          width: isMobile ? '100%' : '800px',
          bgColor: 'white',
          padding: '10px',
          borderTop: '1px solid',
          borderColor: 'gray.200',
          position: isMobile ? 'fixed' : 'absolute',
          bottom: 0,
          left: 0,
        })}
      >
        <CommentEditor
          onSubmit={({ comment }) => {
            addComment({ comment });
          }}
        />
      </div>
    </div>
  );
}
