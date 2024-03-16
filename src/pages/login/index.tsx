import Button from '@components/Button';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { vstack } from 'styled-system/patterns';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (payload: { email: string; password: string }) => {
      return axios.post('http://localhost:3001/users/login', payload);
    },
    onSuccess: () => {
      router.push('/');
    },
    onError: (error: AxiosError) => {
      console.log({ error });

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
    </div>
  );
}

export default Login;
