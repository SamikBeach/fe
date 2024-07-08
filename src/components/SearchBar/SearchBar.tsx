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
    e: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (
      e.key.length === 1 &&
      (e.key.match(/[a-z]/i) ||
        e.key.match(/[0-9]/i) ||
        e.key.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/i))
    ) {
      setTimeout(() => {
        textFieldRef.current?.focus();
        setSearchValue(prev => prev + e.key);
      }, 0);
    }

    if (e.key === 'Backspace') {
      textFieldRef.current?.focus();
      setSearchValue(prev => prev.slice(0, -1));
    }
  };

  useEffect(() => {
    window.addEventListener('keypress', e => {
      console.log('keypress');
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        console.log('ArrowDown or ArrowUp');
        setTimeout(() => {
          textFieldRef.current?.focus();
        }, 1000);
      }

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
            e.preventDefault();

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
