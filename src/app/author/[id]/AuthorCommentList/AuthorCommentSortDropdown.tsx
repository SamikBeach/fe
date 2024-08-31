import { CommentSort } from '@models/comment';
import { Button, ChevronDownIcon, DropdownMenu } from '@radix-ui/themes';
import { capitalize } from 'lodash';
import { useState } from 'react';
import { css } from 'styled-system/css';

const SORT_OPTIONS: { label: string; value: CommentSort }[] = [
  { label: 'Top likes', value: 'top_likes' },
  { label: 'Top comments', value: 'top_comments' },
  { label: 'Latest', value: 'latest' },
];

export default function AuthorCommentSortDropdown() {
  const [authorCommentSort, setAuthorCommentSort] = useState('top_likes');

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
          {capitalize(
            SORT_OPTIONS.find(option => option.value === authorCommentSort)
              ?.label
          )}
          <ChevronDownIcon />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        <DropdownMenu.Group title="Sort by">
          <DropdownMenu.Label>Sort by</DropdownMenu.Label>
          {SORT_OPTIONS.map(option => (
            <DropdownMenu.Item
              key={option.value}
              className={css({ cursor: 'pointer' })}
              onSelect={() => setAuthorCommentSort(option.value)}
            >
              {capitalize(option.label)}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
