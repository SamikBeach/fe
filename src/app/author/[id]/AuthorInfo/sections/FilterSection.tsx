import { SegmentedControl } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';
import { Dispatch, SetStateAction } from 'react';
import { css } from 'styled-system/css';
import { HStack, HstackProps } from 'styled-system/jsx';
import OriginalWorkSortDropdown from '../OriginalWorkSortDropdown';
import EditionSortDropdown from '../EditionSortDropdown';
import AuthorCommentSortDropdown from '../../AuthorCommentList/AuthorCommentSortDropdown';

interface Props extends HstackProps {
  setSelected: Dispatch<
    SetStateAction<'original-works' | 'editions' | 'comments'>
  >;
  selected: 'original-works' | 'editions' | 'comments';
  isMobile?: boolean;
}

export default function FilterSection({
  setSelected,
  selected,
  isMobile,
  ...props
}: Props) {
  const t = useTranslations('Author');

  return (
    <HStack justify="space-between" width="400px" px="10px" {...props}>
      <SegmentedControl.Root
        defaultValue="original-works"
        onValueChange={value =>
          setSelected(value as 'original-works' | 'editions' | 'comments')
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
        {isMobile && (
          <SegmentedControl.Item
            value="comments"
            className={css({ cursor: 'pointer' })}
          >
            {t('comments')}
          </SegmentedControl.Item>
        )}
      </SegmentedControl.Root>
      {selected === 'original-works' && <OriginalWorkSortDropdown />}
      {selected === 'editions' && <EditionSortDropdown />}
      {selected === 'comments' && <AuthorCommentSortDropdown size="1" />}
    </HStack>
  );
}
