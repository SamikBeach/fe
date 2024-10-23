'use client';

import { Media } from '@app/media';
import ForgotPasswordForm from './ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <>
      <Media greaterThanOrEqual="lg">
        <ForgotPasswordForm />
      </Media>
      <Media lessThan="lg">
        <ForgotPasswordForm width="100vw" padding="20px" />
      </Media>
    </>
  );
}
