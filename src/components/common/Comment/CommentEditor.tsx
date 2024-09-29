import { currentUserAtom } from '@atoms/user';
import { CommentServerModel } from '@models/comment';
import { AlertDialog, Avatar, Button, TextArea } from '@radix-ui/themes';
import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

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

  const currentUser = useAtomValue(currentUserAtom);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [comment, setComment] = useState(commentProps?.comment ?? '');
  const [openAlertDialog, setOpenAlertDialog] = useState(false);

  const isEditMode = onClose !== undefined;

  return (
    <>
      <HStack alignItems="start" width="100%" justify="end">
        <Avatar
          fallback={currentUser?.name[0] ?? ''}
          radius="full"
          size="2"
          mt="4px"
        />
        <div className={css({ width: width, position: 'relative' })}>
          <TextArea
            ref={textAreaRef}
            autoFocus
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
          />
          <Button
            onClick={() => {
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
                {t('cancel')}
              </Button>
            </AlertDialog.Cancel>
          </HStack>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}
