'use client';

import { HstackProps, VStack } from 'styled-system/jsx';
import { ScrollArea } from '@radix-ui/themes';
import { useState } from 'react';
import { OriginalWorkList } from './OriginalWorkList';
import { EditionList } from './EditionList';
import { css } from 'styled-system/css';
import AvatarSection from './sections/AvatarSection';
import AuthorBasicInfoSection from './sections/AuthorBasicInfoSection';
import FilterSection from './sections/FilterSection';

const SCROLL_THRESHOLD = 319;

interface Props extends HstackProps {
  isMobile?: boolean;
}

export default function AuthorInfo({ isMobile, ...props }: Props) {
  const [selected, setSelected] = useState<'original-works' | 'editions'>(
    'original-works'
  );

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
        >
          <AuthorBasicInfoSection
            isOverThreshold={isMobile ? true : isOverThreshold}
          />
          <FilterSection
            setSelected={setSelected}
            selected={selected}
            width="100%"
          />
        </VStack>

        {selected === 'original-works' ? (
          <OriginalWorkList
            mt={isMobile ? '110px' : isOverThreshold ? '176px' : '0px'}
          />
        ) : (
          <EditionList
            mt={isMobile ? '110px' : isOverThreshold ? '176px' : '0px'}
          />
        )}
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
