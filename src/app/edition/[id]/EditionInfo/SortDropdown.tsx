import { EditionSort } from '@models/edition';
import { Button, ChevronDownIcon, DropdownMenu } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { css } from 'styled-system/css';

const SORT_OPTIONS: { tKey: string; value: EditionSort }[] = [
  { tKey: 'top_likes', value: 'top_likes' },
  { tKey: 'top_comments', value: 'top_comments' },
  {
    tKey: 'publication_date_newest_first',
    value: 'publication_date_newest_first',
  },
  {
    tKey: 'publication_date_oldest_first',
    value: 'publication_date_oldest_first',
  },
  { tKey: 'alphabetical', value: 'alphabetical' },
];

export default function SortDropdown() {
  const t = useTranslations('Edition');

  const [editionCommentSort, setEditionCommentSort] = useState('top_likes');

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
            SORT_OPTIONS.find(option => option.value === editionCommentSort)
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
              onSelect={() => setEditionCommentSort(option.value)}
            >
              {t(option.tKey)}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
