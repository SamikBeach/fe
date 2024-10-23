'use client';

import { HStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { OriginalWorkCommentList } from './OriginalWorkCommentList';
import { OriginalWorkInfo } from './OriginalWorkInfo';
import { Media } from '@app/media';

export default function OriginalWorkPage() {
  return (
    <>
      <Media greaterThanOrEqual="lg">
        <HStack
          alignItems="start"
          justify="center"
          className={css({ width: '100%', minWidth: '1240px' })}
        >
          <OriginalWorkInfo height="100%" />
          <OriginalWorkCommentList />
        </HStack>
      </Media>
      <Media lessThan="lg" className={css({ width: '100%' })}>
        <OriginalWorkInfo height="100%" width="100%" isMobile={true} />
      </Media>
    </>
  );
}
