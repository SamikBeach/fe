import { FilterTriggerButton } from '@components/common/FilterTriggerButton';
import { DropdownMenu } from '@radix-ui/themes';
import { useState } from 'react';
import { css } from 'styled-system/css';

export default function EraFilter() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <div>
          <FilterTriggerButton
            value={value}
            label="Era"
            onClear={() => setValue(null)}
          />
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group title="Era">
          <DropdownMenu.Label>Era</DropdownMenu.Label>
          <DropdownMenu.Item
            className={css({ cursor: 'pointer' })}
            onSelect={() => setValue('Ancient')}
          >
            Ancient
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={css({ cursor: 'pointer' })}
            onSelect={() => setValue('Medieval')}
          >
            Medieval
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={css({ cursor: 'pointer' })}
            onSelect={() => setValue('Modern')}
          >
            Modern
          </DropdownMenu.Item>
          <DropdownMenu.Item
            className={css({ cursor: 'pointer' })}
            onSelect={() => setValue('Contemporary')}
          >
            Contemporary
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
