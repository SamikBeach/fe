import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { TextField } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import SearchPopover from './SearchPopover';
import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchAuthors } from '@apis/author';
import useDebounce from '@hooks/useDebounce';

function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [isOpenSearchPopover, setIsOpenSearchPopover] = useState(false);
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const textFieldRef = useRef(null);

  const { data: authors = [] } = useQuery({
    queryKey: ['author', debouncedSearchValue],
    queryFn: () =>
      searchAuthors({ where__name__i_like: debouncedSearchValue, take: 5 }),
    enabled: debouncedSearchValue !== '',
    select: response => response.data.data,
  });

  return (
    <SearchPopover
      open={isOpenSearchPopover}
      onOpenChange={setIsOpenSearchPopover}
      authors={authors}
    >
      <TextField.Root
        ref={textFieldRef}
        placeholder="Search authors, books..."
        className={css({ width: '250px' })}
        value={searchValue}
        onChange={event => {
          setSearchValue(event.target.value);

          if (event.target.value !== '') {
            setIsOpenSearchPopover(true);
          } else {
            setIsOpenSearchPopover(false);
          }
        }}
      >
        <SearchPopover.Trigger>
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </SearchPopover.Trigger>
      </TextField.Root>
    </SearchPopover>
  );
}

export default SearchBar;
