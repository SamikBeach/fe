import { AuthorServerModel } from '@models/author';
import { Cell, flexRender } from '@tanstack/react-table';
import { Cell as StyledCell } from './styledComponents';
import { memo } from 'react';
// import { Cell } from './styledComponents';

interface Props {
  cell: Cell<AuthorServerModel, unknown>;
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
