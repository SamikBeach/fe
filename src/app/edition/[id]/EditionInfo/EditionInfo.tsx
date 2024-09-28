'use client';

import { HstackProps, VStack } from 'styled-system/jsx';
import { ScrollArea } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import EditionBasicInfo from './EditionBasicInfo';

interface Props extends HstackProps {}

export default function EditionInfo({ ...props }: Props) {
  return (
    <ScrollArea
      scrollbars="vertical"
      className={css({
        height: 'calc(100vh - 64px)',
        flex: 2,
      })}
    >
      <VStack
        gap="20px"
        width="420px"
        alignItems="start"
        px="10px"
        pt="40px"
        ml="auto"
        {...props}
      >
        <EditionBasicInfo />
      </VStack>
    </ScrollArea>
  );
}
