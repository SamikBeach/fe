import { Text } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';

export default function Logo() {
  const router = useRouter();

  return (
    <Text
      weight="bold"
      onClick={() => router.push('/')}
      className={css({ cursor: 'pointer' })}
    >
      Samik Beach
    </Text>
  );
}
