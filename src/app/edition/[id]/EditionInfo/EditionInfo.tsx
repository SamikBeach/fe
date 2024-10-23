'use client';

import { HstackProps, VStack } from 'styled-system/jsx';
import { ScrollArea } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { EditionList } from './EditionList';
import AvatarSection from './sections/AvatarSection';
import EditionBasicInfoSection from './sections/EditionBasicInfoSection';
import { useState } from 'react';
import FilterSection from './sections/FilterSection';
import { EditionCommentList } from '../EditionCommentList';

const SCROLL_THRESHOLD = 266;

interface Props extends HstackProps {
  isMobile?: boolean;
}

export default function EditionInfo({ isMobile, ...props }: Props) {
  const [selected, setSelected] = useState<'editions' | 'comments'>('editions');

  const [isOverThreshold, setIsOverThreshold] = useState(false);

  const renderContent = () => {
    return (
      <VStack gap="20px" width="420px" px="10px" pt="40px" ml="auto" {...props}>
        {!isMobile && <AvatarSection />}

        <VStack
          width={isMobile ? '100%' : '400px'}
          gap={isMobile ? '2px' : '20px'}
          position={isMobile || isOverThreshold ? 'fixed' : 'static'}
          top="64px"
          bgColor="white"
          zIndex={2}
          pt="20px"
          pb="10px"
          borderBottom={isMobile || isOverThreshold ? '1px solid' : 'none'}
          borderColor={isMobile || isOverThreshold ? 'gray.200' : 'none'}
          alignItems="start"
        >
          <EditionBasicInfoSection
            isOverThreshold={isMobile ? true : isOverThreshold}
          />
          <FilterSection
            setSelected={setSelected}
            selected={selected}
            width="100%"
            isMobile={isMobile}
          />
        </VStack>

        {selected === 'editions' && (
          <EditionList
            mt={isMobile ? '170px' : isOverThreshold ? '236px' : '0px'}
          />
        )}
        {selected === 'comments' && <EditionCommentList isMobile={isMobile} />}
      </VStack>
    );
  };

  if (isMobile) {
    return renderContent();
  }

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
      {renderContent()}
    </ScrollArea>
  );
}
