import { currentUserAtom } from '@atoms/user';
import { AlertDialog, Avatar, Button } from '@radix-ui/themes';
import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { useLocale, useTranslations } from 'next-intl';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import { LoginAlertDialog } from '../LoginAlertDialog';
import { Editor } from './Editor';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { searchAuthors } from '@apis/author';
import { BeautifulMentionsItem } from 'lexical-beautiful-mentions';
import { searchOriginalWorks } from '@apis/original-work';
import { searchEditions } from '@apis/edition';
import { searchUsers } from '@apis/user';
import { getEditorConfig, getIsEditorStateEmpty } from './Editor/utils';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getRoot } from 'lexical';
import { searchUserValueAtom, searchValueAtom } from './atoms';

interface Props {
  onSubmit: ({
    comment,
    commentId,
  }: {
    comment: string;
    commentId?: number;
  }) => void;
  onClose?: () => void;
  comment?: string;
  setComment?: (comment: string | null) => void;
  width?: string;
}

interface Handle {
  focus: () => void;
}

const CommentEditor = forwardRef<Handle, Props>(
  (
    {
      onSubmit,
      setComment: setCommentFromProps,
      onClose,
      comment: commentProps,
      width = '100%',
    },
    ref
  ) => {
    const t = useTranslations('Common');

    const locale = useLocale();

    const currentUser = useAtomValue(currentUserAtom);

    const textAreaRef = useRef<HTMLDivElement>(null);

    const [editor] = useLexicalComposerContext();

    useEffect(() => {
      console.log({ commentProps });
      editor.update(() => {
        if (commentProps != null) {
          const newEditorState = editor.parseEditorState(
            JSON.parse(commentProps)
          );

          editor.setEditorState(newEditorState);
        }
      });
    }, [commentProps, editor]);

    useImperativeHandle(ref, () => ({
      focus: () => {
        console.log(textAreaRef.current);
        textAreaRef.current?.focus();
        console.log('focus');
      },
    }));

    const [comment, setComment] = useState(commentProps);
    const [openAlertDialog, setOpenAlertDialog] = useState(false);
    const [openLoginAlertDialog, setOpenLoginAlertDialog] = useState(false);

    const isEditMode = onClose !== undefined;

    const searchValue = useAtomValue(searchValueAtom);
    const searchUserValue = useAtomValue(searchUserValueAtom);

    const { data: authors = [] } = useQuery({
      queryKey: ['author', searchValue],
      queryFn: () =>
        searchAuthors({ keyword: searchValue ?? '', limit: 2, locale }),
      select: response => response.data.data,
      enabled: searchValue != null,
      placeholderData: keepPreviousData,
    });

    const { data: originalWorks = [] } = useQuery({
      queryKey: ['original-work', searchValue],
      queryFn: () =>
        searchOriginalWorks({ keyword: searchValue ?? '', limit: 2, locale }),
      select: response => response.data.data,
      enabled: searchValue != null,
      placeholderData: keepPreviousData,
    });

    const { data: editions = [] } = useQuery({
      queryKey: ['edition', searchValue],
      queryFn: () => searchEditions({ keyword: searchValue ?? '', limit: 2 }),
      select: response => response.data.data,
      enabled: searchValue != null,
      placeholderData: keepPreviousData,
    });

    const { data: users = [] } = useQuery({
      queryKey: ['user', searchUserValue],
      queryFn: () => searchUsers({ keyword: searchUserValue ?? '', limit: 5 }),
      select: response => response.data.data,
      enabled: searchUserValue != null,
      placeholderData: keepPreviousData,
    });

    const mentionItems: Record<string, BeautifulMentionsItem[]> = {
      '@': users.map(user => ({
        id: user.id,
        value: user.nickname ?? '',
        type: 'user',
      })),
      '#': [
        ...authors.map(author => ({
          id: author.id,
          value: author.name,
          name: author.name,
          nameInKor: author.name_in_kor,
          imageUrl: author.image_url ?? null,
          type: 'author',
        })),
        ...originalWorks.map(originalWork => ({
          id: originalWork.id,
          value: originalWork.title,
          titleInEng: originalWork.title_in_eng ?? null,
          titleInKor: originalWork.title_in_kor ?? null,
          authorNameInKor: originalWork.author.name_in_kor,
          type: 'original-work',
        })),
        ...editions.map(edition => ({
          id: edition.id,
          value: edition.title,
          title: edition.title ?? null,
          imageUrl: edition.image_url ?? null,
          authorNameInKor: edition.author.name_in_kor,
          type: 'edition',
        })),
      ],
    };

    const handleResetComment = () => {
      setComment(undefined);
      setCommentFromProps?.(null);

      editor.update(() => {
        // 현재 root를 가져와서 clear한 뒤, 빈 단락 노드를 추가
        const root = $getRoot();
        root.clear(); // 기존 내용을 제거
      });
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
              ref={textAreaRef}
              comment={comment}
              setComment={setComment}
              mentionItems={mentionItems}
              placeholder={currentUser === null ? t('login_to_comment') : ''}
              onBlur={e => {
                if (isEditMode) {
                  if (e.relatedTarget?.className.includes('submit-button')) {
                    return;
                  }

                  setOpenAlertDialog(true);
                }
              }}
              onKeyDownCapture={e => {
                if (comment == null) {
                  return;
                }

                if (e.metaKey && e.key === 'Enter') {
                  e.stopPropagation();
                  e.preventDefault();

                  if (getIsEditorStateEmpty(editor)) {
                    return;
                  }

                  onSubmit({ comment });
                  handleResetComment();
                }

                if (isEditMode && e.key === 'Escape') {
                  setOpenAlertDialog(true);
                }
              }}
            />
            <Button
              onClick={() => {
                if (comment == null) {
                  return;
                }

                if (currentUser === null) {
                  setOpenLoginAlertDialog(true);

                  return;
                }

                onSubmit({ comment });

                handleResetComment();
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
              disabled={comment == null || getIsEditorStateEmpty(editor)}
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

                    textAreaRef.current?.focus();
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
);

const CommentEditorWithLexicalComposer = forwardRef<HTMLDivElement, Props>(
  (props, ref) => {
    return (
      <LexicalComposer
        initialConfig={getEditorConfig({ comment: props.comment })}
      >
        <CommentEditor ref={ref} {...props} />
      </LexicalComposer>
    );
  }
);

export default CommentEditorWithLexicalComposer;
