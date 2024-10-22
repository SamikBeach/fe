'use client';

import { HStack } from 'styled-system/jsx';
import { AuthorFilter, FieldFilter } from './filters';
import { SortDropdown } from './sort';
import SearchTextField from './SearchTextField';
import { Media } from '@app/media';
import { css } from 'styled-system/css';

export default function EditionFilterBox() {
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
        width="1200px"
        px="10px"
        height="64px"
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        <HStack>
          <Media greaterThanOrEqual="sm">
            <HStack>
              <FieldFilter />
              <AuthorFilter />
            </HStack>
          </Media>
        </HStack>
        <Media greaterThanOrEqual="sm">
          <HStack>
            <SearchTextField />
            <SortDropdown />
          </HStack>
        </Media>
        <Media lessThan="sm" className={css({ width: '100%' })}>
          <HStack width="100%" justify="end">
            <SearchTextField className={css({ width: '100%' })} />
            <SortDropdown />
          </HStack>
        </Media>
      </HStack>
    </HStack>
  );
}
