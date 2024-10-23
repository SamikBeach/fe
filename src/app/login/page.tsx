'use client';

import { Media } from '@app/media';
import LoginForm from './LoginForm';
import { css } from 'styled-system/css';

export default function LoginPage() {
  return (
    <>
      <Media greaterThanOrEqual="lg">
        <LoginForm />
      </Media>
      <Media lessThan="lg">
        <LoginForm
          variant="ghost"
          className={css({ width: '100vw', padding: '20px' })}
        />
      </Media>
    </>
  );
}
