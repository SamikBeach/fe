import Button from '@components/Button';
import axios, { AxiosError } from 'axios';
import { useSetAtom } from 'jotai';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { jwtAtom } from 'src/atoms';
import { userIdAtom } from 'src/atoms/user';
import { vstack } from 'styled-system/patterns';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setJwt = useSetAtom(jwtAtom);
  const setUserId = useSetAtom(userIdAtom);

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (payload: { email: string; password: string }) => {
      return axios.post('http://localhost:3001/user/login', payload);
    },
    onSuccess: data => {
      setJwt(data.data.jwt);
      setUserId(data.data.id);

      router.push('/');
    },
    onError: (error: AxiosError) => {
      alert(
        error.message + '\n' + '\n' + (error.response?.data as any).message
      );
    },
  });

  return (
    <div className={vstack({ marginTop: '20' })}>
      <input
        type="text"
        placeholder="email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />
      <Button color="gray" onClick={() => mutation.mutate({ email, password })}>
        login
      </Button>
      <Button color="gray" onClick={() => router.push('/sign-up')}>
        go to the sign-up page
      </Button>
    </div>
  );
}

export default Login;
