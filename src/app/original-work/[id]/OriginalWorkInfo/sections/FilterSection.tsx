import { SegmentedControl } from '@radix-ui/themes';
import { HStack } from 'styled-system/jsx';
import SortDropdown from '../SortDropdown';
import { useTranslations } from 'next-intl';
import { css } from 'styled-system/css';

export default function FilterSection() {
  const t = useTranslations('OriginalWork');

  return (
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
  );
}
