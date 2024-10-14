'use client';

import { HstackProps, VStack } from 'styled-system/jsx';
import { ScrollArea } from '@radix-ui/themes';
import { EditionList } from './EditionList';
import { css } from 'styled-system/css';
import { useState } from 'react';
import AvatarSection from './sections/AvatarSection';
import FilterSection from './sections/FilterSection';
import OriginalWorkBasicInfoSection from './sections/OriginalWorkBasicInfoSection';

const SCROLL_THRESHOLD = 218;

interface Props extends HstackProps {}

export default function OriginalWorkInfo({ ...props }: Props) {
  const [isOverThreshold, setIsOverThreshold] = useState(false);

  return (
    <ScrollArea
      scrollbars="vertical"
      className={css({
        height: 'calc(100vh - 64px)',
        flex: 2,
      })}
      onScroll={e => {
        if (
          (e.target as HTMLElement).scrollTop > SCROLL_THRESHOLD &&
          !isOverThreshold
        ) {
          setIsOverThreshold(true);
        }

        if (
          (e.target as HTMLElement).scrollTop <= SCROLL_THRESHOLD &&
          isOverThreshold
        ) {
          setIsOverThreshold(false);
        }
      }}
    >
      <VStack gap="20px" width="420px" px="10px" pt="40px" ml="auto" {...props}>
        <AvatarSection />

        <VStack
          width="400px"
          gap="20px"
          position={isOverThreshold ? 'fixed' : 'static'}
          top="64px"
          bgColor="white"
          zIndex={2}
          pt="20px"
          pb="10px"
          borderBottom={isOverThreshold ? '1px solid' : 'none'}
          borderColor={isOverThreshold ? 'gray.200' : 'none'}
        >
          <OriginalWorkBasicInfoSection isOverThreshold={isOverThreshold} />
          <FilterSection />
        </VStack>

        <EditionList mt={isOverThreshold ? '240px' : '0px'} />
      </VStack>
    </ScrollArea>
  );
}
