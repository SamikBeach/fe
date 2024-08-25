import { isLoggedInAtom } from '@atoms/auth';
import { useAtom } from 'jotai';
import { HStack } from 'styled-system/jsx';
import UserProfileIconButton from './UserProfileIconButton';
import { SearchBar } from './SearchBar';
import { GoogleLogin } from '@react-oauth/google';

// const BUTTONS = [
//   { href: '/login', label: 'Log in' },
//   { href: '/sign-up', label: 'Sign up' },
// ];

export default function RightSlot() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);

  return (
    <HStack gap="30px">
      <SearchBar />
      {isLoggedIn ? (
        <UserProfileIconButton />
      ) : (
        <HStack gap="20px">
          <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
              setIsLoggedIn(true);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
            useOneTap
          />
          {/* {BUTTONS.map(({ href, label }) => (
            <Button
              key={href}
              asChild
              variant="ghost"
              className={css({ color: 'black', fontWeight: 'medium' })}
            >
              <Link href={href}>{label}</Link>
            </Button>
          ))} */}
        </HStack>
      )}
    </HStack>
  );
}
