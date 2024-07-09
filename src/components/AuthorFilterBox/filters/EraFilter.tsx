import { getAllEras } from '@apis/era';
import { isFilterOpenAtom, selectedEraIdAtom } from '@atoms/filter';
import { Select, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { ComponentProps, useRef, useState } from 'react';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';
import SearchTextField from './SearchTextField';

interface Props extends ComponentProps<typeof Select.Root> {}

function EraFilter({ onValueChange, ...props }: Props) {
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);

  const textFieldRef = useRef<HTMLInputElement>(null);

  const setSelectedEraId = useSetAtom(selectedEraIdAtom);
  const [isFilterOpen, setIsFilterOpen] = useAtom(isFilterOpenAtom);

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
      open={open}
      onOpenChange={opened => {
        if (opened) {
          setTimeout(() => {
            textFieldRef.current?.focus();
          }, 0);
        }

        setSearchValue('');
        setIsFilterOpen(opened);
        setOpen(opened);
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
        onPointerDown={e => {
          if (isFilterOpen) {
            e.preventDefault();
          }
        }}
      />
      <Select.Content
        side="bottom"
        position="popper"
        variant="soft"
        className={css({
          maxHeight: '400px',

          '& .rt-SelectViewport': {
            paddingTop: '0px',
          },
        })}
      >
        <SearchTextField
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          textFieldRef={textFieldRef}
        />
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
