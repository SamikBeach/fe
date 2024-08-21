import { Cross2Icon } from '@radix-ui/react-icons';
import { Button, ChevronDownIcon, DropdownMenu } from '@radix-ui/themes';
import { useState } from 'react';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

export default function SchoolFilter() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button
          variant="outline"
          className={css({
            cursor: 'pointer',
            color: value === null ? 'gray' : 'black',
          })}
        >
          {value === null ? 'School' : value}
          {value === null ? (
            <ChevronDownIcon />
          ) : (
            <HStack
              borderRadius="50%"
              _hover={{ bgColor: 'gray.200' }}
              padding="4px"
              onPointerDown={e => {
                e.stopPropagation();

                setValue(null);
              }}
            >
              <Cross2Icon />
            </HStack>
          )}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group title="School">
          <DropdownMenu.Label>School</DropdownMenu.Label>
          <DropdownMenu.Item
            className={css({ cursor: 'pointer' })}
            onSelect={() => setValue('Metaphysics')}
          >
            Metaphysics
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
