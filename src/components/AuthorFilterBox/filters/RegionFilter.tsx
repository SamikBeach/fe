import { getAllRegions } from '@apis/region';
import { isFilterOpenAtom, selectedRegionIdAtom } from '@atoms/filter';
import { Select, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { ComponentProps, useRef, useState } from 'react';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';
import SearchTextField from './SearchTextField';

interface Props extends ComponentProps<typeof Select.Root> {}

function RegionFilter({ onValueChange, ...props }: Props) {
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);

  const textFieldRef = useRef<HTMLInputElement>(null);

  const setSelectedRegionId = useSetAtom(selectedRegionIdAtom);
  const [isFilterOpen, setIsFilterOpen] = useAtom(isFilterOpenAtom);

  const { data: regions = [] } = useQuery({
    queryKey: ['region'],
    queryFn: getAllRegions,
    select: response => response.data,
  });

  const handleValueChange = (value: string) => {
    setSelectedRegionId(Number(value));

    onValueChange?.(value);
  };

  const searchedRegions = regions.filter(region =>
    region.region.toLowerCase().includes(searchValue.toLowerCase())
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
        placeholder="Region"
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
        {searchedRegions.length === 0 ? (
          <VStack height="200px" alignItems="center" justify="center">
            <Text>No Results</Text>
          </VStack>
        ) : (
          searchedRegions
            .sort((a, b) => a.region.localeCompare(b.region))
            .map((region, index) => (
              <Select.Item
                key={region.id}
                value={String(region.id)}
                onKeyDown={e => {
                  if (
                    (index === 0 && e.key === 'ArrowUp') ||
                    (index === searchedRegions.length - 1 &&
                      e.key === 'ArrowDown')
                  ) {
                    textFieldRef.current?.focus();
                  }
                }}
              >
                {region.region}
              </Select.Item>
            ))
        )}
      </Select.Content>
    </Select.Root>
  );
}

export default RegionFilter;
