import { editionSearchKeywordAtom } from '@atoms/searchKeyword';
import useDebounce from '@hooks/useDebounce';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { TextField } from '@radix-ui/themes';
import { useAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import { ComponentProps, useEffect, useState } from 'react';
import { css } from 'styled-system/css';

interface Props extends ComponentProps<typeof TextField.Root> {}

export default function SearchTextField(props: Props) {
  const t = useTranslations('Edition');

  const [searchKeyword, setSearchKeyword] = useAtom(editionSearchKeywordAtom);
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
      placeholder={t('search_editions_placeholder')}
      className={css({
        width: '300px',
      })}
      value={searchValue}
      onChange={e => handleValueChange(e.target.value)}
      {...props}
    >
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
    </TextField.Root>
  );
}
