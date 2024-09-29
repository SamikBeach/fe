'use client';

import { HStack, HstackProps, VStack } from 'styled-system/jsx';
import AuthorBasicInfo from './AuthorBasicInfo';
import { ScrollArea, SegmentedControl } from '@radix-ui/themes';
import { useState } from 'react';
import { OriginalWorkList } from './OriginalWorkList';
import { EditionList } from './EditionList';
import { css } from 'styled-system/css';
import SortDropdown from './SortDropdown';
import { useTranslations } from 'next-intl';

interface Props extends HstackProps {}

export default function AuthorInfo({ ...props }: Props) {
  const t = useTranslations('Author');

  const [selected, setSelected] = useState<'original-works' | 'editions'>(
    'original-works'
  );

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

        <HStack width="100%" justify="space-between" pr="14px">
          <SegmentedControl.Root
            defaultValue="original-works"
            onValueChange={value =>
              setSelected(value as 'original-works' | 'editions')
            }
            size="1"
          >
            <SegmentedControl.Item
              value="original-works"
              className={css({ cursor: 'pointer' })}
            >
              {t('original_works')}
            </SegmentedControl.Item>
            <SegmentedControl.Item
              value="editions"
              className={css({ cursor: 'pointer' })}
            >
              {t('editions')}
            </SegmentedControl.Item>
          </SegmentedControl.Root>
          <SortDropdown />
        </HStack>

        {selected === 'original-works' ? <OriginalWorkList /> : <EditionList />}
      </VStack>
    </ScrollArea>
  );
}
