'use client';

import { HStack } from 'styled-system/jsx';
import {
  EraFilter,
  FieldFilter,
  MainInterestFilter,
  SchoolFilter,
} from './filters';
import { SortDropdown } from './sort';
import SearchTextField from './SearchTextField';

export default function AuthorFilter() {
  return (
    <HStack justify="space-between" width="1160px">
      <HStack>
        <FieldFilter />
        <EraFilter />
        <SchoolFilter />
        <MainInterestFilter />
      </HStack>
      <HStack>
        <SearchTextField />
        <SortDropdown />
      </HStack>
    </HStack>
  );
}
