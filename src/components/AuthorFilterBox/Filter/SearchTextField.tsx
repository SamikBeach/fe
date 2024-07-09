import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { TextField } from '@radix-ui/themes';
import { RefObject } from 'react';
import { css } from 'styled-system/css';

interface Props {
  searchValue: string;
  setSearchValue: (value: string) => void;
  textFieldRef: RefObject<HTMLInputElement>;
}

export default function SearchTextField({
  searchValue,
  setSearchValue,
  textFieldRef,
}: Props) {
  return (
    <div
      className={css({
        position: 'sticky',
        top: 0,
        zIndex: 1,
        paddingTop: '8px',
        paddingBottom: '2px',
        backgroundColor: 'white',
      })}
    >
      <TextField.Root
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        ref={textFieldRef}
        placeholder="Search era..."
        mb="6px"
        className={css({
          backgroundColor: 'white',
        })}
        onKeyDown={e => {
          if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') {
            e.stopPropagation();
          }
        }}
      >
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
    </div>
  );
}
