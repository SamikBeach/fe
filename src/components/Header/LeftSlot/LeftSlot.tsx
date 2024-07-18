import { Button } from '@elements/Button';

import { useRouter, usePathname } from 'next/navigation';
import { css } from 'styled-system/css';
import { Logo } from '../../Logo';
import { HStack } from 'styled-system/jsx';
import Link from 'next/link';

export default function LeftSlot() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <HStack gap="40px">
      <Link href="/">
        <Logo
          width="60px"
          onClick={() => router.push('/')}
          className={css({ cursor: 'pointer' })}
        />
      </Link>
      <HStack gap="30px">
        <Button
          asChild
          variant="ghost"
          size="3"
          className={css({
            color: 'black',
            fontWeight: 'medium',

            backgroundColor: pathname.startsWith('/authors')
              ? 'gray.100'
              : undefined,
          })}
        >
          <Link href="/authors">Authors</Link>
        </Button>

        <Button
          asChild
          variant="ghost"
          size="3"
          className={css({
            color: 'black',
            fontWeight: 'medium',

            backgroundColor: pathname.startsWith('/originals')
              ? 'gray.100'
              : undefined,
          })}
        >
          <Link href="/originals">Originals</Link>
        </Button>

        <Button
          asChild
          variant="ghost"
          size="3"
          className={css({
            color: 'black',
            fontWeight: 'medium',
            backgroundColor: pathname.startsWith('/books')
              ? 'gray.100'
              : undefined,
          })}
        >
          <Link href="/books">Books</Link>
        </Button>
      </HStack>
    </HStack>
  );
}
