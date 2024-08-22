import { AuthorServerModel } from 'legacy_src/models/author';
import { HstackProps, VStack } from 'styled-system/jsx';
import AuthorBasicInfo from './AuthorBasicInfo';
import { ScrollArea, SegmentedControl } from '@radix-ui/themes';
import { useState } from 'react';
import { OriginalWorkList } from './OriginalWorkList';
import { EditionList } from './EditionList';
import { css } from 'styled-system/css';

interface Props extends HstackProps {
  author: AuthorServerModel;
}

export default function AuthorInfo({ author, ...props }: Props) {
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
        px="20px"
        pt="40px"
        ml="auto"
        {...props}
      >
        <AuthorBasicInfo author={author} />

        <SegmentedControl.Root
          defaultValue="original-works"
          onValueChange={value =>
            setSelected(value as 'original-works' | 'editions')
          }
          size="1"
        >
          <SegmentedControl.Item value="original-works">
            Originals
          </SegmentedControl.Item>
          <SegmentedControl.Item value="editions">
            Editions
          </SegmentedControl.Item>
        </SegmentedControl.Root>

        {selected === 'original-works' ? <OriginalWorkList /> : <EditionList />}
      </VStack>
    </ScrollArea>
  );
}
