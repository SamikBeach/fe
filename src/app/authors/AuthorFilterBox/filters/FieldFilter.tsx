import { FilterTriggerButton } from '@components/common/FilterTriggerButton';
import { DropdownMenu } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { css } from 'styled-system/css';

export default function FieldFilter() {
  const t = useTranslations('Author');

  const [value, setValue] = useState<string | null>(t('philosophy'));

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div>
          <FilterTriggerButton
            value={value}
            label={t('field')}
            onClear={() => setValue(null)}
          />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group title={t('field')}>
          <DropdownMenu.Label>{t('field')}</DropdownMenu.Label>
          <DropdownMenu.Item
            className={css({ cursor: 'pointer' })}
            onSelect={() => setValue(t('philosophy'))}
          >
            {t('philosophy')}
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
