import { HStack, HstackProps } from 'styled-system/jsx';
import { SegmentedControl } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { useTranslations } from 'next-intl';
import SortDropdown from '../SortDropdown';
import { Dispatch, SetStateAction } from 'react';
import EditionCommentSortDropdown from '../../EditionCommentList/EditionCommentSortDropdown';

interface Props extends HstackProps {
  setSelected: Dispatch<SetStateAction<'editions' | 'comments'>>;
  selected: 'editions' | 'comments';
  isMobile?: boolean;
}

export default function FilterSection({
  setSelected,
  selected,
  isMobile,
  ...props
}: Props) {
  const t = useTranslations('Edition');

  return (
    <HStack width="100%" justify="space-between" px="10px" {...props}>
      <SegmentedControl.Root
        defaultValue="editions"
        size="1"
        onValueChange={value => setSelected(value as 'editions' | 'comments')}
      >
        <SegmentedControl.Item
          value="editions"
          className={css({ cursor: 'pointer' })}
        >
          {t('other_editions')}
        </SegmentedControl.Item>
        {isMobile && (
          <SegmentedControl.Item
            value="comments"
            className={css({ cursor: 'pointer' })}
          >
            {t('comments')}
          </SegmentedControl.Item>
        )}
      </SegmentedControl.Root>
      {selected === 'editions' && <SortDropdown />}
      {selected === 'comments' && <EditionCommentSortDropdown size="1" />}
    </HStack>
  );
}
