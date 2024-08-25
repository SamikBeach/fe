import { isLoggedInAtom } from '@atoms/auth';
import { useAtom } from 'jotai';
import { HStack } from 'styled-system/jsx';
import UserProfileIconButton from './UserProfileIconButton';
import { SearchBar } from './SearchBar';
import { GoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { loginWithGoogle } from '@apis/auth';
import api from '@apis/config';

// const BUTTONS = [
//   { href: '/login', label: 'Log in' },
//   { href: '/sign-up', label: 'Sign up' },
// ];

export default function RightSlot() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);

  const { mutate } = useMutation({
    mutationFn: loginWithGoogle,
    onSuccess: ({ data }) => {
      api.defaults.headers.common['Authorization'] =
        `Bearer ${data.accessToken}`;

      console.log({ data });
      setIsLoggedIn(true);
    },
  });

  return (
    <HStack gap="30px">
      <SearchBar />
      {isLoggedIn ? (
        <UserProfileIconButton />
      ) : (
        <HStack gap="20px">
          <GoogleLogin
            onSuccess={credentialResponse => {
              mutate({ token: credentialResponse.credential ?? '' });
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
