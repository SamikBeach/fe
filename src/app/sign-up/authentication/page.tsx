'use client';

import { Media } from '@app/media';
import AuthenticationForm from './AuthenticationForm';

export default function AuthenticationPage() {
  return (
    <>
      <Media greaterThanOrEqual="lg">
        <AuthenticationForm />
      </Media>
      <Media lessThan="lg">
        <AuthenticationForm width="100vw" padding="20px" />
      </Media>
    </>
  );
}
