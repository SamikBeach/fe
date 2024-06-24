import { viewModeAtom } from '@atoms/viewMode';
import { Flex, SegmentedControl, Select } from '@radix-ui/themes';
import { useAtomValue, useSetAtom } from 'jotai';
import { css } from 'styled-system/css';

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
      <FilterSelect />
      <ViewModeSelect />
    </Flex>
  );
}

function FilterSelect() {
  return (
    <Select.Root defaultValue="apple">
      <Select.Trigger
        className={css({
          cursor: 'pointer',
          zIndex: 2,
        })}
      />
      <Select.Content side="bottom" position="popper">
        <Select.Group>
          <Select.Label>Fruits</Select.Label>
          <Select.Item value="orange">Orange</Select.Item>
          <Select.Item value="apple">Apple</Select.Item>
        </Select.Group>
        <Select.Separator />
        <Select.Group>
          <Select.Label>Vegetables</Select.Label>
          <Select.Item value="carrot">Carrot</Select.Item>
          <Select.Item value="potato">Potato</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
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
