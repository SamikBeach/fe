import { Row } from '@tanstack/react-table';
import MemoizedCell from './MemoizedCell';
import { Row as StyledRow } from './styledComponents';
import { AuthorServerModel } from '@models/author';
import { VirtualItem, Virtualizer } from '@tanstack/react-virtual';
import { memo } from 'react';

interface Props {
  rows: Row<AuthorServerModel>[];
  virtualRow: VirtualItem<Element>;
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
}

function MemoizedRow({ rows, virtualRow, rowVirtualizer }: Props) {
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
    >
      {row.getVisibleCells().map(cell => {
        return <MemoizedCell key={cell.id} cell={cell} />;
      })}
    </StyledRow>
  );
}

export default memo(MemoizedRow);
