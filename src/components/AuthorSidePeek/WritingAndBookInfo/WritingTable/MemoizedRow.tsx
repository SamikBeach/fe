import { Row } from '@tanstack/react-table';
import MemoizedCell from './MemoizedCell';
import { Row as StyledRow } from './styledComponents';
import { VirtualItem, Virtualizer } from '@tanstack/react-virtual';
import { ComponentProps, memo } from 'react';
import { WritingServerModel } from '@models/writing';
import { css } from 'styled-system/css';

interface Props extends ComponentProps<typeof StyledRow> {
  rows: Row<WritingServerModel>[];
  virtualRow: VirtualItem<Element>;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
}

function MemoizedRow({ rows, virtualRow, rowVirtualizer, ...props }: Props) {
  const row = rows[virtualRow.index];

  return (
    <StyledRow
      data-index={virtualRow.index} //needed for dynamic row height measurement
      ref={node => rowVirtualizer.measureElement(node)} //measure dynamic row height
      style={{
        position: 'absolute',
        width: '100%',
        backgroundColor: 'white',
        transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
      }}
      className={css({})}
      {...props}
    >
      {row.getVisibleCells().map(cell => {
        return <MemoizedCell key={cell.id} cell={cell} />;
      })}
    </StyledRow>
  );
}

export default memo(MemoizedRow);
