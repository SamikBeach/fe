'use client';

import { HStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';

import { UserInfo } from './UserInfo';
import { UserHistory } from './UserHistory';
import { Media } from '@app/media';
import MobileUserInfo from './UserInfo/MobileUserInfo';

export default function UserPage() {
  return (
    <>
      <Media greaterThanOrEqual="lg">
        <HStack
          alignItems="start"
          className={css({ width: '1180px' })}
          gap="50px"
        >
          <UserInfo />
          <UserHistory />
        </HStack>
      </Media>
      <Media lessThan="lg">
        <MobileUserInfo />
        <UserHistory />
      </Media>
    </>
  );
}
