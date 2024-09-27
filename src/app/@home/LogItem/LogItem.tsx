/* eslint-disable react/no-unescaped-entities */
import { AuthorAvatar } from '@components/author/AuthorAvatar';
import { OriginalWorkHoverCard } from '@components/original-work/OriginalWorkHoverCard';
import { LogServerModel } from '@models/log';
import { Avatar, Button } from '@radix-ui/themes';
import { formatDistanceToNow } from 'date-fns';
import { isNil } from 'lodash';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { GiSecretBook } from 'react-icons/gi';
import { css } from 'styled-system/css';
import { VStack, styled } from 'styled-system/jsx';

const MAX_COMMENT_LENGTH = 120;

interface Props {
  log: LogServerModel;
}

export default function LogItem({ log }: Props) {
  const t = useTranslations();

  const {
    user,
    author_comment,
    original_work_comment,
    target_author,
    target_original_work,
    created_at,
  } = log;

  const isAuthorComment = !isNil(author_comment);
  const isOriginalWorkComment = !isNil(original_work_comment);
  const isComment = isAuthorComment || isOriginalWorkComment;

  const comment = author_comment || original_work_comment;

  const [isSeeMoreButtonShown, setIsSeeMoreButtonShown] = useState(
    !isNil(comment) && comment.comment.length > MAX_COMMENT_LENGTH
  );

  const isAuthor = !isNil(target_author);
  const isOriginalWork = !isNil(target_original_work);

  const createdAt = formatDistanceToNow(created_at, {
    addSuffix: true,
  }).replace('about ', '');

  return (
    <VStack
      bgColor="white"
      alignItems="start"
      width="100%"
      padding="16px"
      borderRadius="8px"
      border="1px solid"
      borderColor="gray.200"
      fontSize="14px"
      display="inline"
    >
      {/* <Avatar size="2" fallback="B" radius="full" mb="4px" />{' '} */}
      {/* <BoldText>{user.name}</BoldText>{' '} */}
      {/* {isComment ? 'left a comment on' : 'likes'}{' '}
      {isAuthor && (
        <AuthorAvatar
          author={target_author}
          mb="4px"
          className={css({ cursor: 'pointer' })}
          withName
        />
      )} */}
      {t.rich('Home.log_item_liked', {
        user: () => <BoldText>{user.name}</BoldText>,
        author: () =>
          isAuthor && (
            <AuthorAvatar
              author={target_author}
              mb="4px"
              className={css({ cursor: 'pointer' })}
              withName
            />
          ),
      })}
      {isOriginalWork && (
        <>
          {
            <OriginalWorkHoverCard.Root>
              <OriginalWorkHoverCard.Trigger>
                <span>
                  <Link href={`/original-work/${target_original_work.id}`}>
                    <GiSecretBook
                      className={css({
                        display: 'inline',
                        marginBottom: '2px',
                        cursor: 'pointer',
                        color: 'gray.600',
                      })}
                      size="24px"
                    />{' '}
                    <BoldText>{target_original_work?.title}</BoldText>
                  </Link>
                </span>
              </OriginalWorkHoverCard.Trigger>
              <OriginalWorkHoverCard.Content
                originalWork={target_original_work}
                side="top"
              />
            </OriginalWorkHoverCard.Root>
          }
          , an original work by{' '}
          <AuthorAvatar
            author={target_original_work.author}
            mb="4px"
            className={css({ cursor: 'pointer' })}
            withName
          />
        </>
      )}{' '}
      <span className={css({ fontSize: '13px', color: 'gray.500' })}>
        {createdAt}
      </span>
      {isComment && comment !== undefined && (
        <p
          className={css({
            backgroundColor: ' gray.100',
            padding: '14px',
            mt: '10px',
            borderRadius: '8px',
            whiteSpace: 'pre-wrap',
          })}
        >
          {isSeeMoreButtonShown ? (
            <>
              {`${comment.comment.slice(0, MAX_COMMENT_LENGTH)}...`}
              <Button
                variant="ghost"
                size="1"
                onClick={() => setIsSeeMoreButtonShown(false)}
                className={css({
                  color: 'black',
                  fontWeight: 'medium',
                  pt: '6px',
                  pl: '16px',

                  _hover: {
                    bgColor: 'transparent',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                  },
                })}
              >
                {t('see_more')}
              </Button>
            </>
          ) : (
            comment.comment
          )}
        </p>
      )}
    </VStack>
  );
}

const BoldText = styled('span', {
  base: {
    fontWeight: 'medium',
    cursor: 'pointer',

    _hover: {
      textDecoration: 'underline',
    },
  },
});
