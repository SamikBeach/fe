'use client';

import { HstackProps, VStack } from 'styled-system/jsx';
import { ScrollArea } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { EditionList } from './EditionList';
import AvatarSection from './sections/AvatarSection';
import EditionBasicInfoSection from './sections/EditionBasicInfoSection';
import { useState } from 'react';
import FilterSection from './sections/FilterSection';

const SCROLL_THRESHOLD = 266;

interface Props extends HstackProps {}

export default function EditionInfo({ ...props }: Props) {
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
          alignItems="start"
        >
          <EditionBasicInfoSection isOverThreshold={isOverThreshold} />
          <FilterSection />
        </VStack>

        <EditionList mt={isOverThreshold ? '236px' : '0px'} />
      </VStack>
    </ScrollArea>
  );
}
