'use client';

import { VStack } from 'styled-system/jsx';
import { EditionList } from './EditionList';
import { EditionFilterBox } from './EditionFilterBox';
import { Media } from '@app/media';

export default function EditionsPage() {
  return (
    <VStack py="20px" gap="30px">
      <EditionFilterBox />
      <Media greaterThanOrEqual="lg">
        <EditionList />
      </Media>
      <Media lessThan="lg">
        <EditionList width="100%" justify="center" />
      </Media>
    </VStack>
  );
}
