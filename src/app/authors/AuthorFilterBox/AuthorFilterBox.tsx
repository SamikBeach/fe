'use client';

import { HStack } from 'styled-system/jsx';
import { EraFilter, FieldFilter } from './filters';
import { SortDropdown } from './sort';
import SearchTextField from './SearchTextField';

export default function AuthorFilterBox() {
  return (
    <HStack
      position="fixed"
      top="64px"
      bgColor="white"
      width="100%"
      justify="center"
      zIndex={2}
    >
      <HStack
        justify="space-between"
        width="1180px"
        height="64px"
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        <HStack>
          <FieldFilter />
          <EraFilter />
        </HStack>
        <HStack>
          <SearchTextField />
          <SortDropdown />
        </HStack>
      </HStack>
    </HStack>
  );
}
