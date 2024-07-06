import { SegmentedControl } from '@radix-ui/themes';
import { Dispatch, SetStateAction } from 'react';
import { css } from 'styled-system/css';

interface Props {
  tableType: 'writing' | 'book';
  setTableType: Dispatch<SetStateAction<'writing' | 'book'>>;
}

export default function TableSegmentControl({ tableType, setTableType }: Props) {
  return (
    <SegmentedControl.Root
      className={css({ alignSelf: 'start' })}
      defaultValue={tableType}
      onValueChange={value => setTableType(value as 'writing' | 'book')}
    >
      <SegmentedControl.Item
        value="writing"
        onSelect={() => setTableType('writing')}
      >
        Writing
      </SegmentedControl.Item>
      <SegmentedControl.Item value="book" onSelect={() => setTableType('book')}>
        Book
      </SegmentedControl.Item>
    </SegmentedControl.Root>
  );
}
