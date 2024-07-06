import { getAllMainInterests } from '@apis/main_interest';
import { selectedMainInterestIdAtom } from '@atoms/filter';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Select, TextField, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { ComponentProps, useRef, useState } from 'react';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';

interface Props extends ComponentProps<typeof Select.Root> {}

function MainInterestFilter({ onValueChange, ...props }: Props) {
  const [searchValue, setSearchValue] = useState('');

  const textFieldRef = useRef<HTMLInputElement>(null);

  const setSelectedMainInterestId = useSetAtom(selectedMainInterestIdAtom);

  const { data: mainInterests = [] } = useQuery({
    queryKey: ['mainInterest'],
    queryFn: getAllMainInterests,
    select: response => response.data,
  });

  const handleValueChange = (value: string) => {
    setSelectedMainInterestId(Number(value));

    onValueChange?.(value);
  };

  const searchedMainInterets = mainInterests.filter(mainInteret =>
    mainInteret.main_interest.toLowerCase().includes(searchValue.toLowerCase())
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
        placeholder="Main Interest"
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
          placeholder="Search main interets..."
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
        {searchedMainInterets.length === 0 ? (
          <VStack height="200px" alignItems="center" justify="center">
            <Text>No Results</Text>
          </VStack>
        ) : (
          searchedMainInterets
            .sort((a, b) => a.main_interest.localeCompare(b.main_interest))
            .map((mainInterest, index) => (
              <Select.Item
                key={mainInterest.id}
                value={String(mainInterest.id)}
                onKeyDown={e => {
                  if (
                    (index === 0 && e.key === 'ArrowUp') ||
                    (index === searchedMainInterets.length - 1 &&
                      e.key === 'ArrowDown')
                  ) {
                    textFieldRef.current?.focus();
                  }
                }}
              >
                {mainInterest.main_interest}
              </Select.Item>
            ))
        )}
      </Select.Content>
    </Select.Root>
  );
}

export default MainInterestFilter;
