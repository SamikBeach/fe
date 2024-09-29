import { CommentSort } from '@models/comment';
import { Button, ChevronDownIcon, DropdownMenu } from '@radix-ui/themes';
import { capitalize } from 'lodash';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { css } from 'styled-system/css';

const SORT_OPTIONS: { tKey: string; value: CommentSort }[] = [
  { tKey: 'top_likes', value: 'top_likes' },
  { tKey: 'top_comments', value: 'top_comments' },
  { tKey: 'newest_first', value: 'newest_first' },
];

export default function SortDropdown() {
  const t = useTranslations('OriginalWork');

  const [originalWorkCommentSort, setOriginalWorkCommentSort] =
    useState('top_likes');

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
            SORT_OPTIONS.find(
              option => option.value === originalWorkCommentSort
            )?.tKey
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
              onSelect={() => setOriginalWorkCommentSort(option.value)}
            >
              {t(option.tKey)}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
