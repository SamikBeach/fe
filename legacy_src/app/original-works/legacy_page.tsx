'use client';

import { HStack, VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { WritingTable } from 'legacy_src/components/WritingTable';
import { WritingFilterBox } from 'legacy_src/components/WritingFilterBox';

export default function WritingPage() {
  return (
    <HStack gap="0px" height="calc(100vh - 64px)" alignItems="start">
      <VStack
        width="300px"
        height="100%"
        className={css({
          boxShadow: '1px 0 0 rgba(0, 0, 0, 0.05)',
        })}
      >
        <WritingFilterBox />
      </VStack>
      <HStack width="calc(100vw - 300px)">
        <WritingTable />
      </HStack>
    </HStack>
  );
}
