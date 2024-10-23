'use client';

import { HStack } from 'styled-system/jsx';
import { AuthorInfo } from './AuthorInfo';
import { AuthorCommentList } from './AuthorCommentList';
import { Media } from '@app/media';
import { css } from 'styled-system/css';

export default function AuthorPage() {
  return (
    <>
      <Media greaterThanOrEqual="lg">
        <HStack
          alignItems="start"
          justify="center"
          className={css({ width: '100%', minWidth: '1240px' })}
        >
          <AuthorInfo height="100%" />
          <AuthorCommentList />
        </HStack>
      </Media>
      <Media lessThan="lg" className={css({ width: '100%' })}>
        <AuthorInfo height="100%" width="100%" isMobile={true} />
      </Media>
    </>
  );
}
