import { Button } from '@elements/Button';

import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import Logo from '../Logo';
import { HStack } from 'styled-system/jsx';

export default function LeftSlot() {
  const router = useRouter();

  return (
    <HStack gap="40px">
      <Logo />
      <HStack gap="24px">
        <Button
          variant="ghost"
          size="3"
          className={css({ color: 'black', fontWeight: 'medium' })}
          onClick={() => router.push('/authors')}
        >
          <HStack gap="6px">Authors</HStack>
        </Button>
        <Button
          variant="ghost"
          size="3"
          className={css({ color: 'black', fontWeight: 'medium' })}
          onClick={() => router.push('/books')}
        >
          <HStack gap="6px">Books</HStack>
        </Button>
      </HStack>
    </HStack>
  );
}
