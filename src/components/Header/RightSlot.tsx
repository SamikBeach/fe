import { Button } from '@elements/Button';
import { Flex } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';

export default function RightSlot() {
  const router = useRouter();

  return (
    <Flex align="center" gap="14px">
      <Button
        variant="ghost"
        className={css({ color: 'black' })}
        onClick={() => router.push('/login')}
      >
        Log in
      </Button>
      <Button variant="soft" onClick={() => router.push('/sign-up')}>
        Sign up
      </Button>
    </Flex>
  );
}
