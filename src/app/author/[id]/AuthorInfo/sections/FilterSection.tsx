import { SegmentedControl } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';
import { Dispatch, SetStateAction } from 'react';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import OriginalWorkSortDropdown from '../OriginalWorkSortDropdown';
import EditionSortDropdown from '../EditionSortDropdown';

interface Props {
  setSelected: Dispatch<SetStateAction<'original-works' | 'editions'>>;
  selected: 'original-works' | 'editions';
}

export default function FilterSection({ setSelected, selected }: Props) {
  const t = useTranslations('Author');

  return (
    <HStack justify="space-between" width="400px" px="10px">
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
      {selected === 'original-works' ? (
        <OriginalWorkSortDropdown />
      ) : (
        <EditionSortDropdown />
      )}
    </HStack>
  );
}
