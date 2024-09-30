/* eslint-disable react/no-unescaped-entities */
import { AuthorAvatar } from '@components/author/AuthorAvatar';
import { OriginalWorkHoverCard } from '@components/original-work/OriginalWorkHoverCard';
import { LogServerModel } from '@models/log';
import { Avatar, Button } from '@radix-ui/themes';
import { formatDistanceToNow } from 'date-fns';
import { getJosaPicker } from 'josa';
import { isNil } from 'lodash';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import { GiSecretBook } from 'react-icons/gi';
import { css } from 'styled-system/css';
import { VStack, styled } from 'styled-system/jsx';
import { ko, enUS } from 'date-fns/locale';
import { EditionHoverCard } from '@components/edition/EditionHoverCard';

const MAX_COMMENT_LENGTH = 120;

interface Props {
  log: LogServerModel;
}

export default function LogItem({ log }: Props) {
  const t = useTranslations('Home');
  const locale = useLocale();

  const {
    user,
    author_comment,
    original_work_comment,
    edition_comment,
    target_author,
    target_original_work,
    target_edition,
    created_at,
  } = log;

  const isAuthorComment = !isNil(author_comment);
  const isOriginalWorkComment = !isNil(original_work_comment);
  const isEditionComment = !isNil(edition_comment);
  const isComment =
    isAuthorComment || isOriginalWorkComment || isEditionComment;

  const comment = author_comment || original_work_comment || edition_comment;

  const [isSeeMoreButtonShown, setIsSeeMoreButtonShown] = useState(
    !isNil(comment) && comment.comment.length > MAX_COMMENT_LENGTH
  );

  const isAuthor = !isNil(target_author);
  const isOriginalWork = !isNil(target_original_work);
  const isEdition = !isNil(target_edition);

  const createdAt = formatDistanceToNow(new Date(created_at), {
    locale: locale === 'ko' ? ko : enUS,
    addSuffix: true,
    includeSeconds: true,
  });

  const authorLikeText = t.rich('log_item_author_like', {
    User: () => <BoldText>{user.name}</BoldText>,
    Author: () =>
      isAuthor && (
        <AuthorAvatar
          author={target_author}
          mb="4px"
          className={css({ cursor: 'pointer' })}
          withName
        />
      ),
    Josa: () =>
      locale === 'ko' &&
      target_author != null &&
      getJosaPicker('을')(target_author.name_in_kor),
  });

  const authorCommentText = t.rich('log_item_author_comment', {
    User: () => <BoldText>{user.name}</BoldText>,
    Author: () =>
      isAuthor && (
        <AuthorAvatar
          author={target_author}
          mb="4px"
          className={css({ cursor: 'pointer' })}
          withName
        />
      ),
  });

  const originalWorkLikeText = t.rich('log_item_original_work_like', {
    User: () => <BoldText>{user.name}</BoldText>,
    OriginalWork: () =>
      isOriginalWork && (
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
                    <BoldText>
                      {locale === 'ko'
                        ? target_original_work?.title_in_kor
                        : target_original_work?.title}
                    </BoldText>
                  </Link>
                </span>
              </OriginalWorkHoverCard.Trigger>
              <OriginalWorkHoverCard.Content
                originalWork={target_original_work}
                side="top"
              />
            </OriginalWorkHoverCard.Root>
          }
        </>
      ),
    Author: () =>
      isOriginalWork && (
        <AuthorAvatar
          author={target_original_work.author}
          mb="4px"
          className={css({ cursor: 'pointer' })}
          withName
        />
      ),
    Josa: () =>
      locale === 'ko' &&
      target_original_work?.title_in_kor != null &&
      getJosaPicker('을')(target_original_work.title_in_kor),
  });

  const originalWorkCommentText = t.rich('log_item_original_work_comment', {
    User: () => <BoldText>{user.name}</BoldText>,
    OriginalWork: () =>
      isOriginalWork && (
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
                    <BoldText>
                      {locale === 'ko'
                        ? target_original_work?.title_in_kor
                        : target_original_work?.title}
                    </BoldText>
                  </Link>
                </span>
              </OriginalWorkHoverCard.Trigger>
              <OriginalWorkHoverCard.Content
                originalWork={target_original_work}
                side="top"
              />
            </OriginalWorkHoverCard.Root>
          }
        </>
      ),
    Author: () =>
      isOriginalWork && (
        <AuthorAvatar
          author={target_original_work.author}
          mb="4px"
          className={css({ cursor: 'pointer' })}
          withName
        />
      ),
  });

  const editionLikeText = t.rich('log_item_edition_like', {
    User: () => <BoldText>{user.name}</BoldText>,
    Edition: () =>
      isEdition && (
        <>
          {
            <EditionHoverCard.Root>
              <EditionHoverCard.Trigger>
                <span>
                  <Link href={`/edition/${target_edition.id}`}>
                    <Avatar
                      size="2"
                      src={target_edition?.image_url ?? undefined}
                      fallback={target_edition?.title[0]}
                    />{' '}
                    <BoldText>{target_edition.title}</BoldText>
                  </Link>
                </span>
              </EditionHoverCard.Trigger>
              <EditionHoverCard.Content edition={target_edition} side="top" />
            </EditionHoverCard.Root>
          }
        </>
      ),
    Author: () =>
      isEdition && (
        <AuthorAvatar
          author={target_edition.author}
          mb="4px"
          className={css({ cursor: 'pointer' })}
          withName
        />
      ),
    Josa: () =>
      locale === 'ko' &&
      target_edition?.title != null &&
      getJosaPicker('을')(target_edition.title),
  });

  const editionCommentText = t.rich('log_item_edition_comment', {
    User: () => <BoldText>{user.name}</BoldText>,
    Edition: () =>
      isEdition && (
        <>
          {
            <EditionHoverCard.Root>
              <EditionHoverCard.Trigger>
                <span>
                  <Link href={`/edition/${target_edition.id}`}>
                    <Avatar
                      size="2"
                      src={target_edition?.image_url ?? undefined}
                      fallback={target_edition?.title[0]}
                    />{' '}
                    <BoldText>{target_edition.title}</BoldText>
                  </Link>
                </span>
              </EditionHoverCard.Trigger>
              <EditionHoverCard.Content edition={target_edition} side="top" />
            </EditionHoverCard.Root>
          }
        </>
      ),
    Author: () =>
      isEdition && (
        <AuthorAvatar
          author={target_edition.author}
          mb="4px"
          className={css({ cursor: 'pointer' })}
          withName
        />
      ),
  });

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
      {isAuthor && (isComment ? authorCommentText : authorLikeText)}
      {isOriginalWork &&
        (isComment ? originalWorkCommentText : originalWorkLikeText)}{' '}
      {isEdition && (isComment ? editionCommentText : editionLikeText)}{' '}
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
