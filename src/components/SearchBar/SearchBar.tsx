import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { TextField } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import SearchPopover from './SearchPopover';
import { useRef, useState } from 'react';

function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [isOpenSearchPopover, setIsOpenSearchPopover] = useState(false);

  const textFieldRef = useRef(null);

  return (
    <SearchPopover
      open={isOpenSearchPopover}
      onOpenChange={setIsOpenSearchPopover}
    >
      <TextField.Root
        ref={textFieldRef}
        placeholder="Search books, authors..."
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
