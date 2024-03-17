import Button from '@components/Button';
import axios from 'axios';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { jwtAtom } from 'src/atoms';
import { userIdAtom } from 'src/atoms/user';
import { css } from 'styled-system/css';

export default function Page() {
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(false);
  const jwt = useAtomValue(jwtAtom);
  const userId = useAtomValue(userIdAtom);

  const { data } = useQuery<{
    data: { id: string; email: string; name: string };
  }>(
    'user',
    async () =>
      axios.get(`http://localhost:3001/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }),
    { enabled: isUserInfoVisible }
  );

  return (
    <>
      <h1>Main page</h1>
      <Button
        color="gray"
        onClick={() => setIsUserInfoVisible(!isUserInfoVisible)}
      >
        {isUserInfoVisible ? 'Hide User Info' : 'Show User Info'}
      </Button>
      {isUserInfoVisible && (
        <div className={css({ marginTop: '20' })}>
          <h2>
            <b>User Info</b>
          </h2>
          <p>
            <b>Name:</b> {data?.data.name}
          </p>
          <p>
            <b>Email:</b> {data?.data.email}
          </p>
          <p>
            <b>Id:</b> {data?.data.id}
          </p>
        </div>
      )}
    </>
  );
}
