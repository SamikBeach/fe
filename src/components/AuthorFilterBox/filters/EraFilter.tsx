import { getAllEras } from '@apis/era';
import { selectedEraIdAtom } from '@atoms/filter';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Select, TextField, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { ComponentProps, useRef, useState } from 'react';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';

interface Props extends ComponentProps<typeof Select.Root> {}

function EraFilter({ onValueChange, ...props }: Props) {
  const [searchValue, setSearchValue] = useState('');

  const textFieldRef = useRef<HTMLInputElement>(null);

  const setSelectedEraId = useSetAtom(selectedEraIdAtom);

  const { data: eras = [] } = useQuery({
    queryKey: ['era'],
    queryFn: getAllEras,
    select: response => response.data,
  });

  const handleValueChange = (value: string) => {
    setSelectedEraId(Number(value));

    onValueChange?.(value);
  };

  const searchedEras = eras.filter(era =>
    era.era.toLowerCase().includes(searchValue.toLowerCase())
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
        placeholder="Era"
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
          placeholder="Search era..."
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
        {searchedEras.length === 0 ? (
          <VStack height="200px" alignItems="center" justify="center">
            <Text>No Results</Text>
          </VStack>
        ) : (
          searchedEras
            .sort((a, b) => a.era.localeCompare(b.era))
            .map((era, index) => (
              <Select.Item
                key={era.id}
                value={String(era.id)}
                onKeyDown={e => {
                  if (
                    (index === 0 && e.key === 'ArrowUp') ||
                    (index === searchedEras.length - 1 && e.key === 'ArrowDown')
                  ) {
                    textFieldRef.current?.focus();
                  }
                }}
              >
                {era.era}
              </Select.Item>
            ))
        )}
      </Select.Content>
    </Select.Root>
  );
}

export default EraFilter;
