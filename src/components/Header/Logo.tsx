import { Text } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

export default function Logo() {
  const router = useRouter();

  return (
    <img
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4-o3irRd7LPhII83VTHDk_SeHLXeD6FNWdQ&s"
      width="60px"
      onClick={() => router.push('/')}
      className={css({ cursor: 'pointer' })}
    />
  );
}
