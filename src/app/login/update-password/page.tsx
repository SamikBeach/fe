'use client';

import { Media } from '@app/media';
import UpdatePasswordForm from './UpdatePasswordForm';

export default function UpdatePasswordPage() {
  return (
    <>
      <Media greaterThanOrEqual="lg">
        <UpdatePasswordForm />
      </Media>
      <Media lessThan="lg">
        <UpdatePasswordForm width="100vw" padding="20px" />
      </Media>
    </>
  );
}
