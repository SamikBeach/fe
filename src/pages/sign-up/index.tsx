import Button from '@components/Button';

import { vstack } from 'styled-system/patterns';

function SignUp() {
  return (
    <div className={vstack({ marginTop: '20' })}>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <Button color="gray">SignUp</Button>
    </div>
  );
}

export default SignUp;
