import { authorSortAtom } from '@atoms/sort';
import { AuthorSort } from '@models/author';
import { Button, ChevronDownIcon, DropdownMenu } from '@radix-ui/themes';
import { useAtom } from 'jotai';
import { capitalize } from 'lodash';
import { css } from 'styled-system/css';

const SORT_OPTIONS: { label: string; value: AuthorSort }[] = [
  { label: 'Top likes', value: 'top_likes' },
  { label: 'Top comments', value: 'top_comments' },
  { label: 'Birth date(Youngest first)', value: 'birth_date_youngest_first' },
  { label: 'Birth date(Oldest first)', value: 'birth_date_oldest_first' },
  { label: 'Alphabetical', value: 'alphabetical' },
];

export default function SortDropdown() {
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
          {capitalize(
            SORT_OPTIONS.find(option => option.value === authorSort)?.label
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
              onSelect={() => setAuthorSort(option.value)}
            >
              {capitalize(option.label)}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
