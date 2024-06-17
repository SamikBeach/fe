import { Button } from '@elements/Button';

import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import Logo from './Logo';
import { HStack } from 'styled-system/jsx';
import { GlobeIcon, HomeIcon } from '@radix-ui/react-icons';

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
          onClick={() => router.push('/')}
        >
          <HStack gap="6px">
            <HomeIcon className={css({ marginTop: '2px' })} />
            Home
          </HStack>
        </Button>
        <Button
          variant="ghost"
          size="3"
          className={css({ color: 'black', fontWeight: 'medium' })}
          onClick={() => router.push('/discover')}
        >
          <HStack gap="6px">
            <GlobeIcon className={css({ marginTop: '1px' })} />
            Discover
          </HStack>
        </Button>
      </HStack>
    </HStack>
  );
}
