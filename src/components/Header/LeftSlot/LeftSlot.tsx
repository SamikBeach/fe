import { Button } from '@elements/Button';

import { useRouter, usePathname } from 'next/navigation';
import { css } from 'styled-system/css';
import { Logo } from '../../Logo';
import { HStack } from 'styled-system/jsx';

export default function LeftSlot() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <HStack gap="40px">
      <Logo
        width="60px"
        onClick={() => router.push('/')}
        className={css({ cursor: 'pointer' })}
      />
      <HStack gap="30px">
        <Button
          variant="ghost"
          size="3"
          className={css({
            color: 'black',
            fontWeight: 'medium',

            backgroundColor: pathname.startsWith('/author')
              ? 'gray.100'
              : undefined,
          })}
          onClick={() => router.push('/authors')}
        >
          <HStack gap="6px">Authors</HStack>
        </Button>

        <Button
          variant="ghost"
          size="3"
          className={css({
            color: 'black',
            fontWeight: 'medium',
            backgroundColor: pathname.startsWith('/books')
              ? 'gray.100'
              : undefined,
          })}
          onClick={() => router.push('/books')}
        >
          <HStack gap="6px">Books</HStack>
        </Button>
      </HStack>
    </HStack>
  );
}
