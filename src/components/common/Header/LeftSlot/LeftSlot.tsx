import { usePathname } from 'next/navigation';
import { css } from 'styled-system/css';
import { Logo } from '../../Logo';
import { HStack } from 'styled-system/jsx';
import Link from 'next/link';
import MenuButton from './MenuButton';

const MENU_ITEMS = [
  { href: '/authors', label: 'Authors' },
  { href: '/original-works', label: 'Original works' },
  { href: '/editions', label: 'Editions' },
];

export default function LeftSlot() {
  const pathname = usePathname();

  return (
    <HStack gap="40px">
      <Link href="/">
        <Logo className={css({ cursor: 'pointer' })} />
      </Link>

      <HStack gap="30px">
        {MENU_ITEMS.map(({ href, label }) => (
          <MenuButton
            key={href}
            className={css({
              backgroundColor: pathname.startsWith(href)
                ? 'gray.100'
                : undefined,
            })}
          >
            <Link href={href}>{label}</Link>
          </MenuButton>
        ))}
      </HStack>
    </HStack>
  );
}
