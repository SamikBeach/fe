import { getAllAuthors } from '@apis/author';
import { originalWorkFilterAtom } from '@atoms/filter';
import { FilterTriggerButton } from '@components/common/FilterTriggerButton';
import { DropdownMenu } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useLocale, useTranslations } from 'next-intl';
import { css } from 'styled-system/css';

export default function AuthorFilter() {
  const t = useTranslations('OriginalWork');

  const locale = useLocale();

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
          value: locale === 'ko' ? author.name_in_kor : author.name,
        }))
        .sort((a, b) => a.value?.localeCompare(b.value)),
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
            label={t('author')}
            onClear={() =>
              setOriginalWorkFilter(prev => ({ ...prev, authorId: null }))
            }
          />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className={css({ maxHeight: '500px' })}>
        <DropdownMenu.Group title={t('author')}>
          <DropdownMenu.Label>{t('author')}</DropdownMenu.Label>
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
