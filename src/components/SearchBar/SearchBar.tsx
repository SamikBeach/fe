import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { TextField } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import SearchDropdownMenu from './SearchDropdownMenu';
import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchAuthors } from '@apis/author';
import useDebounce from '@hooks/useDebounce';
import { FocusScope } from '@radix-ui/react-focus-scope';

function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [isOpenSearchDropdownMenu, setIsOpenSearchDropdownMenu] =
    useState(false);
  const debouncedSearchValue = useDebounce(searchValue, 200);

  const textFieldRef = useRef<HTMLInputElement>(null);
  const searchDropdownMenuContentRef = useRef<HTMLDivElement>(null);

  const { data: authors = [] } = useQuery({
    queryKey: ['author', debouncedSearchValue],
    queryFn: () =>
      searchAuthors({ where__name__i_like: debouncedSearchValue, take: 5 }),
    enabled: debouncedSearchValue !== '',
    select: response => response.data.data,
  });

  const handleKeyDownDropdownMenuItem = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (index === 0 && e.key === 'ArrowUp') {
      textFieldRef.current?.focus();
    }
  };

  return (
    <SearchDropdownMenu
      open={isOpenSearchDropdownMenu}
      onOpenChange={setIsOpenSearchDropdownMenu}
      authors={authors}
      ref={searchDropdownMenuContentRef}
      onKeyDownDropdownMenuItem={handleKeyDownDropdownMenuItem}
    >
      <FocusScope trapped={false}>
        <TextField.Root
          ref={textFieldRef}
          placeholder="Search authors, books..."
          className={css({ width: '250px' })}
          value={searchValue}
          onKeyDown={e => {
            if (e.key === 'ArrowDown') {
              searchDropdownMenuContentRef.current?.focus();
            }
          }}
          onChange={event => {
            setSearchValue(event.target.value);

            setTimeout(() => {
              event.target.focus();
            }, 0);

            if (event.target.value !== '') {
              setIsOpenSearchDropdownMenu(true);
            } else {
              setIsOpenSearchDropdownMenu(false);
            }
          }}
        >
          <SearchDropdownMenu.Trigger>
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </SearchDropdownMenu.Trigger>
        </TextField.Root>
      </FocusScope>
    </SearchDropdownMenu>
  );
}

export default SearchBar;
