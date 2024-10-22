'use client';

import { VStack } from 'styled-system/jsx';
import { AuthorFilterBox } from './AuthorFilterBox';
import { AuthorList } from './AuthorList';
import { Media } from '@app/media';

export default function AuthorsPage() {
  return (
    <VStack py="20px" gap="30px">
      <AuthorFilterBox />
      <Media greaterThanOrEqual="lg">
        <AuthorList />
      </Media>
      <Media lessThan="lg">
        <AuthorList width="100%" justify="center" />
      </Media>
    </VStack>
  );
}
