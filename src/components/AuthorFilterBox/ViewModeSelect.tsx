import { viewModeAtom } from '@atoms/viewMode';
import { SegmentedControl } from '@radix-ui/themes';
import { useSetAtom } from 'jotai';
import { css } from 'styled-system/css';

export default function ViewModeSelect() {
  const setViewMode = useSetAtom(viewModeAtom);

  return (
    <SegmentedControl.Root
      className={css({ zIndex: 2, backgroundColor: 'white', width: '100%' })}
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
