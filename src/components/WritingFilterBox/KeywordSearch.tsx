import { writingSearchKeywordAtom } from '@atoms/searchKeyword';
import useDebounce from '@hooks/useDebounce';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { TextField } from '@radix-ui/themes';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { css } from 'styled-system/css';

export default function KeywordSearch() {
  const [searchKeyword, setSearchKeyword] = useAtom(writingSearchKeywordAtom);
  const [searchValue, setSearchValue] = useState(searchKeyword);

  const debouncedSearchKeyword = useDebounce(searchValue, 200);

  const handleValueChange = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    setSearchKeyword(debouncedSearchKeyword);
  }, [debouncedSearchKeyword, setSearchKeyword]);

  return (
    <TextField.Root
      type="text"
      placeholder="Search titles..."
      size="3"
      className={css({
        width: '100%',
        fontSize: '13px',
        height: '30px',
      })}
      radius="medium"
      value={searchValue}
      onChange={e => handleValueChange(e.target.value)}
    >
      <TextField.Slot>
        <MagnifyingGlassIcon />
      </TextField.Slot>
    </TextField.Root>
  );
}
