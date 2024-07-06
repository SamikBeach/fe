import { getAllNationalities } from '@apis/nationality';
import { selectedNationalityIdAtom } from '@atoms/filter';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Select, TextField, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { ComponentProps, useRef, useState } from 'react';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';

interface Props extends ComponentProps<typeof Select.Root> {}

function NationalityFilter({ onValueChange, ...props }: Props) {
  const [searchValue, setSearchValue] = useState('');

  const textFieldRef = useRef<HTMLInputElement>(null);

  const setSelectedNationalityId = useSetAtom(selectedNationalityIdAtom);

  const { data: nationalities = [] } = useQuery({
    queryKey: ['nationality'],
    queryFn: getAllNationalities,
    select: response => response.data,
  });

  const handleValueChange = (value: string) => {
    setSelectedNationalityId(Number(value));

    onValueChange?.(value);
  };

  const searchedNationalites = nationalities.filter(nationality =>
    nationality.nationality.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Select.Root
      onValueChange={handleValueChange}
      onOpenChange={opened => {
        if (opened) {
          setTimeout(() => {
            textFieldRef.current?.focus();
          }, 0);
        }

        setSearchValue('');
      }}
      {...props}
    >
      <Select.Trigger
        className={css({
          cursor: 'pointer',
          zIndex: 2,
          backgroundColor: 'white',
        })}
        placeholder="Nationality"
      />
      <Select.Content
        side="bottom"
        position="popper"
        variant="soft"
        className={css({ maxHeight: '400px' })}
      >
        <TextField.Root
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          ref={textFieldRef}
          placeholder="Search nationality..."
          mb="6px"
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
        {searchedNationalites.length === 0 ? (
          <VStack height="200px" alignItems="center" justify="center">
            <Text>No Results</Text>
          </VStack>
        ) : (
          searchedNationalites
            .sort((a, b) => a.nationality.localeCompare(b.nationality))
            .map((nationality, index) => (
              <Select.Item
                key={nationality.id}
                value={String(nationality.id)}
                onKeyDown={e => {
                  if (
                    (index === 0 && e.key === 'ArrowUp') ||
                    (index === searchedNationalites.length - 1 &&
                      e.key === 'ArrowDown')
                  ) {
                    textFieldRef.current?.focus();
                  }
                }}
              >
                {nationality.nationality}
              </Select.Item>
            ))
        )}
      </Select.Content>
    </Select.Root>
  );
}

export default NationalityFilter;
