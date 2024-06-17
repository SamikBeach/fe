import { Button } from '@elements/Button';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { DropdownMenu, TextField } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

export default function RightSlot() {
  const router = useRouter();

  return (
    <HStack gap="30px">
      <TextField.Root
        placeholder="Search books, authors..."
        className={css({ width: '250px' })}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
      <HStack gap="14px">
        <Button
          variant="ghost"
          className={css({ color: 'black', fontWeight: 'medium' })}
          onClick={() => router.push('/login')}
        >
          Log in
        </Button>
        <Button
          variant="soft"
          onClick={() => router.push('/sign-up')}
          className={css({ color: 'black', fontWeight: 'medium' })}
        >
          Sign up
        </Button>
      </HStack>
    </HStack>
  );
}
