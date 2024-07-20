import { sortAtom } from '@atoms/sort';
import { SortType } from '@models/sort';
import { IconButton } from '@radix-ui/themes';
import { useAtom } from 'jotai';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa6';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';
import { columnHeaderNameMap } from './utils';

export default function ColumnHeader({ type }: { type: SortType }) {
  const [sorts, setSorts] = useAtom(sortAtom);

  const hasSort = sorts.filter(sort => sort.type === type).length > 0;
  const sortDirection = sorts.find(sort => sort.type === type)?.direction;

  return (
    <HStack justify="space-between">
      {columnHeaderNameMap[type]}
      <IconButton
        variant="ghost"
        className={css({ cursor: 'pointer' })}
        onClick={() => {
          const newSorts = sorts.filter(sort => sort.type !== type);

          if (sortDirection === 'asc') {
            setSorts([...newSorts, { type, direction: 'desc' }]);
          } else if (sortDirection === 'desc') {
            setSorts([...newSorts]);
          } else {
            setSorts([...newSorts, { type, direction: 'asc' }]);
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
