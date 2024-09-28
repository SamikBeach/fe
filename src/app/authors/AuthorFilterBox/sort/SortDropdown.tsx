import { authorSortAtom } from '@atoms/sort';
import { AuthorSort } from '@models/author';
import { Button, ChevronDownIcon, DropdownMenu } from '@radix-ui/themes';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import { css } from 'styled-system/css';

const SORT_OPTIONS: { tKey: string; value: AuthorSort }[] = [
  { tKey: 'top_likes', value: 'top_likes' },
  { tKey: 'top_comments', value: 'top_comments' },
  { tKey: 'birth_date_youngest_first', value: 'birth_date_youngest_first' },
  { tKey: 'birth_date_oldest_first', value: 'birth_date_oldest_first' },
  { tKey: 'alphabetical', value: 'alphabetical' },
];

export default function SortDropdown() {
  const t = useTranslations('Author');

  const [authorSort, setAuthorSort] = useAtom(authorSortAtom);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button
          variant="outline"
          className={css({
            cursor: 'pointer',
            color: 'black',
          })}
        >
          {t(SORT_OPTIONS.find(option => option.value === authorSort)?.tKey)}
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
              onSelect={() => setAuthorSort(option.value)}
            >
              {t(option.tKey)}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
