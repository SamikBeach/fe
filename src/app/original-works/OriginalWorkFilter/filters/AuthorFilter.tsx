import { getAllAuthors } from '@apis/author';
import { originalWorkFilterAtom } from '@atoms/filter';
import { FilterTriggerButton } from '@components/common/FilterTriggerButton';
import { DropdownMenu } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { css } from 'styled-system/css';

export default function AuthorFilter() {
  const [originalWorkFilter, setOriginalWorkFilter] = useAtom(
    originalWorkFilterAtom
  );

  const { data: authors = [] } = useQuery({
    queryKey: ['author'],
    queryFn: getAllAuthors,
    select: response =>
      response.data
        .map(author => ({
          id: author.id,
          value: author.name,
        }))
        .sort((a, b) => a.value.localeCompare(b.value)),
  });

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div>
          <FilterTriggerButton
            value={
              authors.find(author => author.id === originalWorkFilter.authorId)
                ?.value
            }
            label="Author"
            onClear={() =>
              setOriginalWorkFilter(prev => ({ ...prev, authorId: null }))
            }
          />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className={css({ maxHeight: '500px' })}>
        <DropdownMenu.Group title="Author">
          <DropdownMenu.Label>Author</DropdownMenu.Label>
          {authors.map(author => (
            <DropdownMenu.Item
              key={author.id}
              className={css({ cursor: 'pointer' })}
              onSelect={() =>
                setOriginalWorkFilter(prev => ({
                  ...prev,
                  authorId: author.id,
                }))
              }
            >
              {author.value}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
