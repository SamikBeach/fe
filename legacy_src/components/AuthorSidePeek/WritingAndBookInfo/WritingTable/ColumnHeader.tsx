import { Sort, SortType } from 'legacy_src/models/sort';
import { IconButton } from '@radix-ui/themes';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa6';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import { columnHeaderNameMap } from './utils';
import { Dispatch, SetStateAction } from 'react';

export default function ColumnHeader({
  type,
  sort,
  setSort,
}: {
  type: SortType;
  sort: Sort;
  setSort: Dispatch<SetStateAction<Sort>>;
}) {
  const hasSort = sort.filter(s => s.type === type).length > 0;
  const sortDirection = sort.find(s => s.type === type)?.direction;

  return (
    <HStack justify="space-between">
      {columnHeaderNameMap[type]}
      <IconButton
        variant="ghost"
        className={css({ cursor: 'pointer' })}
        onClick={() => {
          const newSort = sort.filter(s => s.type !== type);

          if (sortDirection === 'asc') {
            setSort([...newSort, { type, direction: 'desc' }]);
          } else if (sortDirection === 'desc') {
            setSort([...newSort]);
          } else {
            setSort([...newSort, { type, direction: 'asc' }]);
          }
        }}
      >
        {sortDirection === 'asc' && (
          <FaSortUp className={css({ color: 'gray.500' })} />
        )}
        {sortDirection === 'desc' && (
          <FaSortDown className={css({ color: 'gray.500' })} />
        )}
        {!hasSort && <FaSort className={css({ color: 'gray.300' })} />}
      </IconButton>
    </HStack>
  );
}
