import { SegmentedControl } from '@radix-ui/themes';
import { css } from 'styled-system/css';

interface Props extends SegmentedControl.RootProps {}

export default function TableSegmentControl(props: Props) {
  return (
    <SegmentedControl.Root className={css({ alignSelf: 'start' })} {...props}>
      <SegmentedControl.Item
        value="writing"
        // onSelect={() => setTableType('writing')}
      >
        Writing
      </SegmentedControl.Item>
      <SegmentedControl.Item value="book">Book</SegmentedControl.Item>
    </SegmentedControl.Root>
  );
}
