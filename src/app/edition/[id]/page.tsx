'use client';

import { HStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { EditionCommentList } from './EditionCommentList';
import { EditionInfo } from './EditionInfo';
import { Media } from '@app/media';

export default function EditionPage() {
  return (
    <>
      <Media greaterThanOrEqual="lg">
        <HStack
          alignItems="start"
          justify="center"
          className={css({ width: '100%', minWidth: '1240px' })}
        >
          <EditionInfo height="100%" />
          <EditionCommentList />
        </HStack>
      </Media>
      <Media lessThan="lg" className={css({ width: '100%' })}>
        <EditionInfo height="100%" width="100%" isMobile={true} />
      </Media>
    </>
  );
}
