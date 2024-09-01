import { originalWorkSortAtom } from '@atoms/sort';
import { OriginalWorkSort } from '@models/original-work';
import { Button, ChevronDownIcon, DropdownMenu } from '@radix-ui/themes';
import { useAtom } from 'jotai';
import { capitalize } from 'lodash';
import { css } from 'styled-system/css';

const SORT_OPTIONS: { label: string; value: OriginalWorkSort }[] = [
  { label: 'Top likes', value: 'top_likes' },
  { label: 'Top comments', value: 'top_comments' },
  {
    label: 'Publication date(Newest first)',
    value: 'publication_date_newest_first',
  },
  {
    label: 'Publication date(Oldest first)',
    value: 'publication_date_oldest_first',
  },
  { label: 'Alphabetical', value: 'alphabetical' },
];

export default function SortDropdown() {
  const [originalWorkSort, setOriginalWorkSort] = useAtom(originalWorkSortAtom);

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
            SORT_OPTIONS.find(option => option.value === originalWorkSort)
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
              onSelect={() => setOriginalWorkSort(option.value)}
            >
              {capitalize(option.label)}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
