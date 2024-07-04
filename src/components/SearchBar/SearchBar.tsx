import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { TextField } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import SearchDropdownMenu from './SearchDropdownMenu';
import { useEffect, useRef, useState } from 'react';
import useDebounce from '@hooks/useDebounce';
import classNames from 'classnames';

function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [isOpenSearchDropdownMenu, setIsOpenSearchDropdownMenu] =
    useState(false);
  const debouncedSearchValue = useDebounce(searchValue, 200);

  const textFieldRef = useRef<HTMLInputElement>(null);
  const searchDropdownMenuContentRef = useRef<HTMLDivElement>(null);

  const handleKeyDownDropdownMenuItem = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (index === 0 && e.key === 'ArrowUp') {
      textFieldRef.current?.focus();
    }
  };

  useEffect(() => {
    window.addEventListener('keypress', e => {
      if (e.key === '/') {
        if (searchValue !== '') {
          setIsOpenSearchDropdownMenu(true);
        }

        setTimeout(() => {
          textFieldRef.current?.focus();
        }, 0);
      }
    });
  }, [searchValue]);

  return (
    <SearchDropdownMenu
      ref={searchDropdownMenuContentRef}
      open={isOpenSearchDropdownMenu}
      onOpenChange={setIsOpenSearchDropdownMenu}
      searchValue={debouncedSearchValue}
      onKeyDownDropdownMenuItem={handleKeyDownDropdownMenuItem}
    >
      <TextField.Root
        ref={textFieldRef}
        placeholder="Search authors, books..."
        className={classNames(css({ width: '250px' }), 'search-bar')}
        value={searchValue}
        onClick={e => {
          if (searchValue !== '' && !isOpenSearchDropdownMenu) {
            setIsOpenSearchDropdownMenu(true);

            setTimeout(() => {
              (e.target as HTMLInputElement).focus();
            }, 0);
          }
        }}
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
    </SearchDropdownMenu>
  );
}

export default SearchBar;
