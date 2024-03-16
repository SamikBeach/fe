import Button from '@components/Button';
import axios from 'axios';
import { useMutation } from 'react-query';
import { vstack } from 'styled-system/patterns';

function Login() {
  const mutation = useMutation({
    mutationFn: newTodo => {
      return axios.post('http://localhost:3001/users/login', newTodo);
    },
  });

  return (
    <div className={vstack({ marginTop: '20' })}>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <Button color="gray" onClick={() => mutation.mutate()}>
        login
      </Button>
    </div>
  );
}

export default Login;
