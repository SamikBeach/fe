import { getAllEras } from '@apis/era';
import { authorFilterAtom } from '@atoms/filter';
import { FilterTriggerButton } from '@components/common/FilterTriggerButton';
import { DropdownMenu } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { capitalize, isNil } from 'lodash';
import { useLocale, useTranslations } from 'next-intl';
import { css } from 'styled-system/css';

export default function EraFilter() {
  const t = useTranslations('Author');

  const locale = useLocale();

  const [authorFilter, setAuthorFilter] = useAtom(authorFilterAtom);

  const { data: eras = [] } = useQuery({
    queryKey: ['era'],
    queryFn: getAllEras,
    select: response =>
      response.data.map(era => ({
        id: era.id,
        value: locale === 'ko' ? era.era_in_kor : era.era,
      })),
  });

  const value = eras.find(era => era.id === authorFilter.eraId)?.value;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div>
          <FilterTriggerButton
            value={isNil(value) ? null : capitalize(value)}
            label={t('era')}
            onClear={() => setAuthorFilter(prev => ({ ...prev, eraId: null }))}
          />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className={css({ minWidth: '140px' })}>
        <DropdownMenu.Group title={t('era')}>
          <DropdownMenu.Label>{t('era')}</DropdownMenu.Label>
          {eras.map(era => (
            <DropdownMenu.Item
              key={era.id}
              className={css({ cursor: 'pointer' })}
              onSelect={() =>
                setAuthorFilter(prev => ({ ...prev, eraId: era.id }))
              }
            >
              {capitalize(era.value)}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
