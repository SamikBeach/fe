'use client';

import { css } from 'styled-system/css';
import SignUpForm from './SignUpForm';
import { Media } from '@app/media';

function SignUpPage() {
  return (
    <>
      <Media greaterThanOrEqual="lg">
        <SignUpForm />
      </Media>
      <Media lessThan="lg">
        <SignUpForm
          variant="ghost"
          className={css({ width: '100vw', padding: '20px' })}
        />
      </Media>
    </>
  );
}

export default SignUpPage;
