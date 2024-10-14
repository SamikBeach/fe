import { HStack } from 'styled-system/jsx';
import { SegmentedControl } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { useTranslations } from 'next-intl';
import SortDropdown from '../SortDropdown';

export default function FilterSection() {
  const t = useTranslations('Edition');

  return (
    <HStack width="100%" justify="space-between" pr="16px">
      <SegmentedControl.Root defaultValue="editions" size="1">
        <SegmentedControl.Item
          value="editions"
          className={css({ cursor: 'pointer' })}
        >
          {t('other_editions')}
        </SegmentedControl.Item>
      </SegmentedControl.Root>
      <SortDropdown />
    </HStack>
  );
}
