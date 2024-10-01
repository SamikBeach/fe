'use client';

import { HStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';

import { UserInfo } from './UserInfo';
import { UserHistory } from './UserHistory';

export default function UserPage() {
  return (
    <HStack alignItems="start" className={css({ width: '1180px' })} gap="50px">
      <UserInfo />
      <UserHistory />
    </HStack>
  );
}
