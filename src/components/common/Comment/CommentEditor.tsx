import { currentUserAtom } from '@atoms/user';
import { CommentServerModel } from '@models/comment';
import { AlertDialog, Avatar, Button, TextArea } from '@radix-ui/themes';
import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { useLocale, useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import { LoginAlertDialog } from '../LoginAlertDialog';
import { Editor } from '../Editor';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { searchAuthors } from '@apis/author';
import useDebounce from '@hooks/useDebounce';
import { BeautifulMentionsItem } from 'lexical-beautiful-mentions';
import { searchOriginalWorks } from '@apis/original-work';
import { searchEditions } from '@apis/edition';

interface Props {
  onSubmit: ({
    comment,
    commentId,
  }: {
    comment: string;
    commentId?: number;
  }) => void;
  onClose?: () => void;
  comment?: CommentServerModel;
  width?: string;
}

export default function CommentEditor({
  onSubmit,
  onClose,
  comment: commentProps,
  width = '100%',
}: Props) {
  const t = useTranslations('Common');

  const locale = useLocale();

  const currentUser = useAtomValue(currentUserAtom);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [comment, setComment] = useState(commentProps?.comment ?? '');
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [openLoginAlertDialog, setOpenLoginAlertDialog] = useState(false);

  const isEditMode = onClose !== undefined;

  const [value, setValue] = useState<string | null>(null);

  const { data: authors = [] } = useQuery({
    queryKey: ['author', value],
    queryFn: () => searchAuthors({ keyword: value ?? '', limit: 2, locale }),
    select: response => response.data.data,
    placeholderData: keepPreviousData,
  });

  const { data: originalWorks = [] } = useQuery({
    queryKey: ['originalWork', value],
    queryFn: () =>
      searchOriginalWorks({ keyword: value ?? '', limit: 2, locale }),
    select: response => response.data.data,
    placeholderData: keepPreviousData,
  });

  const { data: editions = [] } = useQuery({
    queryKey: ['edition', value],
    queryFn: () => searchEditions({ keyword: value ?? '', limit: 2 }),
    select: response => response.data.data,
    placeholderData: keepPreviousData,
  });

  const mentionItems: Record<string, BeautifulMentionsItem[]> = {
    '@': ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'],
    '#': [
      ...authors.map(author => ({
        value: author.name,
        name: author.name,
        nameInKor: author.name_in_kor,
        imageUrl: author.image_url ?? null,
        type: 'author',
      })),
      ...originalWorks.map(originalWork => ({
        value: originalWork.title,
        titleInEng: originalWork.title_in_eng ?? null,
        titleInKor: originalWork.title_in_kor ?? null,
        type: 'original-work',
      })),
      ...editions.map(edition => ({
        value: edition.title,
        title: edition.title ?? null,
        imageUrl: edition.image_url ?? null,
        type: 'edition',
      })),
    ],
  };

  return (
    <>
      <HStack alignItems="start" width="100%" justify="end">
        <Avatar
          fallback={currentUser?.nickname?.[0] ?? ''}
          radius="full"
          size="2"
          mt="4px"
        />
        <div className={css({ width: width, position: 'relative' })}>
          <Editor
            mentionItems={mentionItems}
            value={value}
            setValue={setValue}
          />
          {/* <TextArea
            ref={textAreaRef}
            autoFocus
            placeholder={currentUser === null ? t('login_to_comment') : ''}
            onFocus={e =>
              e.currentTarget.setSelectionRange(
                e.currentTarget.value.length,
                e.currentTarget.value.length
              )
            }
            onBlur={e => {
              if (isEditMode) {
                if (e.relatedTarget?.className.includes('submit-button')) {
                  return;
                }

                setOpenAlertDialog(true);
              }
            }}
            value={comment}
            onChange={e => setComment(e.target.value)}
            className={css({ width: '100%', height: '60px', pr: '80px' })}
            onKeyDown={e => {
              if (e.metaKey && e.key === 'Enter') {
                onSubmit({ comment });
                setComment('');
                textAreaRef.current?.focus();
              }

              if (isEditMode && e.key === 'Escape') {
                setOpenAlertDialog(true);
              }
            }}
          /> */}
          <Button
            onClick={() => {
              if (currentUser === null) {
                setOpenLoginAlertDialog(true);

                return;
              }

              onSubmit({ comment });

              setComment('');
              textAreaRef.current?.focus();
            }}
            size="2"
            variant="outline"
            className={classNames(
              css({
                cursor: 'pointer',
                position: 'absolute',
                right: '10px',
                bottom: '10px',
              }),
              'submit-button'
            )}
            disabled={comment === ''}
          >
            {t('submit')}
          </Button>
        </div>
      </HStack>
      <AlertDialog.Root
        open={openAlertDialog}
        onOpenChange={setOpenAlertDialog}
      >
        <AlertDialog.Content maxWidth="400px">
          <AlertDialog.Title>{t('discard_changes')}</AlertDialog.Title>
          <AlertDialog.Description>
            {t('discard_changes_description')}
          </AlertDialog.Description>
          <HStack mt="30px" justify="end">
            <AlertDialog.Action>
              <Button
                onClick={() => {
                  setOpenAlertDialog(false);
                  onClose?.();
                }}
                className={css({ cursor: 'pointer' })}
              >
                {t('discard')}
              </Button>
            </AlertDialog.Action>
            <AlertDialog.Cancel>
              <Button
                variant="outline"
                onClick={() => {
                  setOpenAlertDialog(false);

                  setTimeout(() => {
                    textAreaRef.current?.focus();
                  }, 100);
                }}
                className={css({ cursor: 'pointer' })}
              >
                {t('cancel_and_continue_editing')}
              </Button>
            </AlertDialog.Cancel>
          </HStack>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <LoginAlertDialog
        open={openLoginAlertDialog}
        onOpenChange={setOpenLoginAlertDialog}
      />
    </>
  );
}
