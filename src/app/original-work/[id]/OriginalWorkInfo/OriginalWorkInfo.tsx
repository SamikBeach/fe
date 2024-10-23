'use client';

import { HstackProps, VStack } from 'styled-system/jsx';
import { ScrollArea } from '@radix-ui/themes';
import { EditionList } from './EditionList';
import { css } from 'styled-system/css';
import { useState } from 'react';
import AvatarSection from './sections/AvatarSection';
import FilterSection from './sections/FilterSection';
import OriginalWorkBasicInfoSection from './sections/OriginalWorkBasicInfoSection';
import { OriginalWorkCommentList } from '../OriginalWorkCommentList';

const SCROLL_THRESHOLD = 218;

interface Props extends HstackProps {
  isMobile?: boolean;
}

export default function OriginalWorkInfo({ isMobile, ...props }: Props) {
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
          <OriginalWorkBasicInfoSection
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
            mt={isMobile ? '170px' : isOverThreshold ? '240px' : '0px'}
          />
        )}
        {selected === 'comments' && (
          <OriginalWorkCommentList isMobile={isMobile} />
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
