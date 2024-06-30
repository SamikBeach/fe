import { SegmentedControl } from '@radix-ui/themes';
import classNames from 'classnames';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';

interface Props extends ComponentProps<typeof SegmentedControl.Root> {}

export default function WritingAndBookSegmentedControl({
  onValueChange,
  className,
  ...props
}: Props) {
  return (
    <SegmentedControl.Root
      size="3"
      className={classNames(css({ width: '200px' }), className)}
      onValueChange={onValueChange}
      {...props}
    >
      <SegmentedControl.Item value="writing">원전</SegmentedControl.Item>
      <SegmentedControl.Item value="book">번역서</SegmentedControl.Item>
    </SegmentedControl.Root>
  );
}
