'use client';

import { HstackProps, VStack } from 'styled-system/jsx';
import AuthorBasicInfo from './OriginalWorkBasicInfo';
import { ScrollArea, SegmentedControl } from '@radix-ui/themes';
import { EditionList } from './EditionList';
import { css } from 'styled-system/css';

interface Props extends HstackProps {}

export default function AuthorInfo({ ...props }: Props) {
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
        <AuthorBasicInfo />

        <SegmentedControl.Root defaultValue="editions" size="1">
          <SegmentedControl.Item
            value="editions"
            className={css({ cursor: 'pointer' })}
          >
            Editions
          </SegmentedControl.Item>
        </SegmentedControl.Root>

        <EditionList />
      </VStack>
    </ScrollArea>
  );
}
