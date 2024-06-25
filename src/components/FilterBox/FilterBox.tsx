import { viewModeAtom } from '@atoms/viewMode';
import { Flex, SegmentedControl, Select } from '@radix-ui/themes';
import { useAtomValue, useSetAtom } from 'jotai';
import { css } from 'styled-system/css';
import EraFilter from './EraFilter';

export default function FilterBox() {
  const viewMode = useAtomValue(viewModeAtom);

  return (
    <Flex
      className={css({
        pointerEvents: 'auto',
        height: '64px',
        width: '100%',
        px: '20px',

        position: viewMode === 'list' ? 'relative' : 'absolute',
        top: '0px',
      })}
      justify="between"
      align="center"
    >
      <EraFilter />
      <ViewModeSelect />
    </Flex>
  );
}

function ViewModeSelect() {
  const setViewMode = useSetAtom(viewModeAtom);

  return (
    <SegmentedControl.Root
      className={css({ zIndex: 2 })}
      defaultValue="list"
      onValueChange={value => setViewMode(value as 'diagram' | 'list')}
    >
      <SegmentedControl.Item value="list" onSelect={() => setViewMode('list')}>
        List
      </SegmentedControl.Item>
      <SegmentedControl.Item
        value="diagram"
        onSelect={() => setViewMode('diagram')}
      >
        Diagram
      </SegmentedControl.Item>
    </SegmentedControl.Root>
  );
}
