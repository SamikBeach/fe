import { Cell, flexRender } from '@tanstack/react-table';
import { Cell as StyledCell } from './styledComponents';
import { memo } from 'react';
import { WritingServerModel } from 'legacy_src/models/writing';

interface Props {
  cell: Cell<WritingServerModel, unknown>;
}

function MemoizedCell({ cell }: Props) {
  return (
    <StyledCell
      style={{
        width: cell.column.getSize(),
        height: '60px',
      }}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </StyledCell>
  );
}

export default memo(MemoizedCell);
