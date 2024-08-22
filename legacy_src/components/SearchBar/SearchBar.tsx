import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { TextField } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { useEffect, useRef, useState } from 'react';
import useDebounce from 'legacy_src/hooks/useDebounce';
import SearchPopover from './SearchPopover';

function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [isOpenSearchPopover, setIsOpenSearchPopover] = useState(false);
  const debouncedSearchValue = useDebounce(searchValue, 200);

  const textFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.key === '/') {
        e.preventDefault();
        textFieldRef.current?.focus();
      }
    });
  }, []);

  return (
    <SearchPopover
      open={isOpenSearchPopover}
      onOpenChange={setIsOpenSearchPopover}
      searchValue={debouncedSearchValue}
    >
      <TextField.Root
        ref={textFieldRef}
        placeholder="Search authors, original works, and editions..."
        className={css({
          width: '400px',
        })}
        value={searchValue}
        onClick={() => {
          if (searchValue !== '' && !isOpenSearchPopover) {
            setIsOpenSearchPopover(true);
          }
        }}
        onChange={event => {
          setSearchValue(event.target.value);

          if (event.target.value === '') {
            setIsOpenSearchPopover(false);
          } else {
            setIsOpenSearchPopover(true);
          }
        }}
        onKeyDown={e => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
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
