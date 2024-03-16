import Button from '@components/Button';
import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';

export default function Page() {
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(false);

  const { data } = useQuery(
    'user',
    async () => {
      axios.get('http://localhost:3001/users');
    },
    { enabled: isUserInfoVisible }
  );

  console.log({ data });

  return (
    <>
      <h1>Main page</h1>
      <Button color="gray" onClick={() => setIsUserInfoVisible(true)}>
        Get User Info
      </Button>
    </>
  );
}
