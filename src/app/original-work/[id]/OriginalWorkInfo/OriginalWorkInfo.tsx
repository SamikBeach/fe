'use client';

import { HStack, HstackProps, VStack } from 'styled-system/jsx';
import AuthorBasicInfo from './OriginalWorkBasicInfo';
import { ScrollArea, SegmentedControl } from '@radix-ui/themes';
import { EditionList } from './EditionList';
import { css } from 'styled-system/css';
import SortDropdown from './SortDropdown';
import { useTranslations } from 'next-intl';

interface Props extends HstackProps {}

export default function AuthorInfo({ ...props }: Props) {
  const t = useTranslations('OriginalWork');

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

        <HStack width="100%" justify="space-between" pr="16px">
          <SegmentedControl.Root defaultValue="editions" size="1">
            <SegmentedControl.Item
              value="editions"
              className={css({ cursor: 'pointer' })}
            >
              {t('editions')}
            </SegmentedControl.Item>
          </SegmentedControl.Root>
          <SortDropdown />
        </HStack>

        <EditionList />
      </VStack>
    </ScrollArea>
  );
}
