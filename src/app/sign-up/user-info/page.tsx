'use client';

import { Media } from '@app/media';
import UserInfoForm from './UserInfoForm';

export default function UserInfoPage() {
  return (
    <>
      <Media greaterThanOrEqual="lg">
        <UserInfoForm />
      </Media>
      <Media lessThan="lg">
        <UserInfoForm width="100vw" padding="20px" />
      </Media>
    </>
  );
}
