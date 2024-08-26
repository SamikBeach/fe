import { isLoggedInAtom } from '@atoms/auth';
import { useAtom } from 'jotai';
import { HStack } from 'styled-system/jsx';
import UserProfileIconButton from './UserProfileIconButton';
import { SearchBar } from './SearchBar';
import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { loginWithGoogle } from '@apis/auth';
import api from '@apis/config';
import { Button } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import Google from '@svg/google';

export default function RightSlot() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);

  const { mutate } = useMutation({
    mutationFn: loginWithGoogle,
    onSuccess: ({ data }) => {
      api.defaults.headers.common['Authorization'] =
        `Bearer ${data.accessToken}`;

      setIsLoggedIn(true);
    },
  });

  const login = useGoogleLogin({
    onSuccess: codeResponse => {
      mutate({ code: codeResponse.code });
    },
    flow: 'auth-code',
  });

  return (
    <HStack gap="20px">
      <SearchBar />
      {isLoggedIn ? (
        <UserProfileIconButton />
      ) : (
        <Button
          variant="outline"
          className={css({
            cursor: 'pointer',
            color: 'black',
            fontWeight: 'medium',
          })}
          onClick={login}
        >
          Sign in with <Google width={14} height={14} />
        </Button>
      )}
    </HStack>
  );
}
