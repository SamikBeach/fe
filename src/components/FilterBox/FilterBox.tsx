import { viewModeAtom } from '@atoms/viewMode';
import { SegmentedControl } from '@radix-ui/themes';
import { useAtomValue, useSetAtom } from 'jotai';
import { css } from 'styled-system/css';
import EraFilter from './EraFilter';
import RegionFilter from './RegionFilter';
import { HStack, HstackProps } from 'styled-system/jsx';
import NationalityFilter from './NationalityFilter';
import classNames from 'classnames';

interface Props extends HstackProps {
  showViewModeSelect?: boolean;
}

export default function FilterBox({
  className,
  showViewModeSelect = true,
  ...props
}: Props) {
  const viewMode = useAtomValue(viewModeAtom);

  return (
    <HStack
      className={classNames(
        css({
          pointerEvents: 'auto',
          height: '64px',
          width: '100%',
          px: '20px',

          position: viewMode === 'list' ? 'relative' : 'absolute',
          top: '0px',
        }),
        className
      )}
      justify="space-between"
      {...props}
    >
      <HStack>
        <EraFilter />
        <RegionFilter />
        <NationalityFilter />
      </HStack>
      {showViewModeSelect && <ViewModeSelect />}
    </HStack>
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
