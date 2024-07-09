import { getAllMainInterests } from '@apis/main_interest';
import { isFilterOpenAtom, selectedMainInterestIdAtom } from '@atoms/filter';
import { Select, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { ComponentProps, useRef, useState } from 'react';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';
import SearchTextField from './SearchTextField';

interface Props extends ComponentProps<typeof Select.Root> {}

function MainInterestFilter({ onValueChange, ...props }: Props) {
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);

  const textFieldRef = useRef<HTMLInputElement>(null);

  const setSelectedMainInterestId = useSetAtom(selectedMainInterestIdAtom);
  const [isFilterOpen, setIsFilterOpen] = useAtom(isFilterOpenAtom);

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
        placeholder="Main Interest"
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
