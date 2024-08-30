/* eslint-disable react/no-unescaped-entities */
import { AuthorAvatar } from '@components/author/AuthorAvatar';
import { OriginalWorkHoverCard } from '@components/original_work/OriginalWorkHoverCard';
import { LogServerModel } from '@models/log';
import { Avatar } from '@radix-ui/themes';
import { format } from 'date-fns';
import { isNil } from 'lodash';
import Link from 'next/link';
import { GiSecretBook } from 'react-icons/gi';
import { css } from 'styled-system/css';
import { VStack, styled } from 'styled-system/jsx';

interface Props {
  log: LogServerModel;
}

export default function LogItem({ log }: Props) {
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

  const isAuthor = !isNil(target_author);
  const isOriginalWork = !isNil(target_original_work);

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
      <Avatar size="2" fallback="B" radius="full" mb="4px" />{' '}
      <BoldText>{user.name}</BoldText>{' '}
      {isComment ? 'left a comment on' : 'likes'}{' '}
      {isAuthor && (
        <AuthorAvatar
          author={target_author}
          mb="4px"
          className={css({ cursor: 'pointer' })}
          withName
        />
      )}
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
        {format(created_at, 'd MMMM y HH:mm')}
      </span>
      {isComment && (
        <p
          className={css({
            backgroundColor: ' gray.100',
            padding: '14px',
            mt: '10px',
            borderRadius: '8px',
            whiteSpace: 'pre-wrap',
          })}
        >
          {comment?.comment}
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
