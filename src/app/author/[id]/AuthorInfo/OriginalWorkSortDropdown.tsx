import { authorOriginalWorkSortAtom } from '@atoms/sort';
import { OriginalWorkSort } from '@models/original-work';
import { Button, ChevronDownIcon, DropdownMenu } from '@radix-ui/themes';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import { css } from 'styled-system/css';

const SORT_OPTIONS: { tKey: string; value: OriginalWorkSort }[] = [
  { tKey: 'top_likes', value: 'top_likes' },
  { tKey: 'top_comments', value: 'top_comments' },
  { tKey: 'top_editions', value: 'top_editions' },
  { tKey: 'alphabetical', value: 'alphabetical' },
];

export default function OriginalWorkSortDropdown() {
  const t = useTranslations('OriginalWork');

  const [authorOriginalWorkSort, setAuthorOriginalWorkSort] = useAtom(
    authorOriginalWorkSortAtom
  );

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button
          size="1"
          variant="outline"
          className={css({
            cursor: 'pointer',
            color: 'black',
          })}
        >
          {t(
            SORT_OPTIONS.find(option => option.value === authorOriginalWorkSort)
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
              onSelect={() => setAuthorOriginalWorkSort(option.value)}
            >
              {t(option.tKey)}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
