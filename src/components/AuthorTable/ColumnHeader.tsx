import { IconButton } from '@radix-ui/themes';
import { useState } from 'react';
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa6';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

export default function ColumnHeader() {
  const [sort, setSort] = useState<'asc' | 'desc' | null>(null);

  return (
    <HStack justify="space-between">
      Name
      <IconButton
        variant="ghost"
        className={css({ cursor: 'pointer' })}
        onClick={() => {
          if (sort === 'asc') {
            setSort('desc');
          } else if (sort === 'desc') {
            setSort(null);
          } else {
            setSort('asc');
          }
        }}
      >
        {sort === 'asc' && <FaSortUp className={css({ color: 'gray.500' })} />}
        {sort === 'desc' && (
          <FaSortDown className={css({ color: 'gray.500' })} />
        )}
        {sort === null && <FaSort className={css({ color: 'gray.300' })} />}
      </IconButton>
    </HStack>
  );
}
