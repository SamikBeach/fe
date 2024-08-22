import { FilterTriggerButton } from '@components/common/FilterTriggerButton';
import { DropdownMenu } from '@radix-ui/themes';
import { useState } from 'react';
import { css } from 'styled-system/css';

export default function FieldFilter() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <FilterTriggerButton value={value} onClear={() => setValue(null)} />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group title="Field">
          <DropdownMenu.Label>Field</DropdownMenu.Label>
          <DropdownMenu.Item
            className={css({ cursor: 'pointer' })}
            onSelect={() => setValue('Philosophy')}
          >
            Philosophy
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
