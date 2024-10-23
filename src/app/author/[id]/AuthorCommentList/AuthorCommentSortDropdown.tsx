import { authorCommentSortAtom } from '@atoms/sort';
import { CommentSort } from '@models/comment';
import {
  Button,
  ButtonProps,
  ChevronDownIcon,
  DropdownMenu,
} from '@radix-ui/themes';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import { css } from 'styled-system/css';

const SORT_OPTIONS: { tKey: string; value: CommentSort }[] = [
  { tKey: 'top_likes', value: 'top_likes' },
  { tKey: 'top_comments', value: 'top_comments' },
  { tKey: 'newest_first', value: 'newest_first' },
];

interface Props extends ButtonProps {}

export default function AuthorCommentSortDropdown(props: Props) {
  const t = useTranslations('Author');

  const [authorCommentSort, setAuthorCommentSort] = useAtom(
    authorCommentSortAtom
  );

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button
          variant="outline"
          className={css({
            cursor: 'pointer',
            color: 'black',
          })}
          {...props}
        >
          {t(
            SORT_OPTIONS.find(option => option.value === authorCommentSort)
              ?.tKey
          )}
          <ChevronDownIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        <DropdownMenu.Group title={t('sort_by')}>
          <DropdownMenu.Label>{t('sort_by')}</DropdownMenu.Label>
          {SORT_OPTIONS.map(option => (
            <DropdownMenu.Item
              key={option.value}
              className={css({ cursor: 'pointer' })}
              onSelect={() => setAuthorCommentSort(option.value)}
            >
              {t(option.tKey)}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
