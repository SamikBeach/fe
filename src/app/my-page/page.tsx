'use client';

import { HStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';

import { UserInfo } from './UserInfo';
import { LikeHistory } from './UserHistory/LikeHistory';

export default function MyPage() {
  return (
    <HStack alignItems="start" className={css({ width: '1180px' })} gap="50px">
      <UserInfo />
      <LikeHistory />
    </HStack>
  );
}
