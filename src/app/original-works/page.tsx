'use client';

import { VStack } from 'styled-system/jsx';
import { OriginalWorkList } from './OriginalWorkList';
import { OriginalWorkFilterBox } from './OriginalWorkFilterBox';
import { Media } from '@app/media';

export default function OriginalWorksPage() {
  return (
    <VStack py="20px" gap="30px">
      <OriginalWorkFilterBox />
      <Media greaterThanOrEqual="lg">
        <OriginalWorkList />
      </Media>
      <Media lessThan="lg">
        <OriginalWorkList width="100%" justify="center" />
      </Media>
    </VStack>
  );
}
