import { getAllSchools } from '@apis/school';
import { isFilterOpenAtom, selectedSchoolIdAtom } from '@atoms/filter';
import { Select, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { ComponentProps, useRef, useState } from 'react';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';
import SearchTextField from './SearchTextField';

interface Props extends ComponentProps<typeof Select.Root> {}

function SchoolFilter({ onValueChange, ...props }: Props) {
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);

  const textFieldRef = useRef<HTMLInputElement>(null);

  const setSelectedSchoolId = useSetAtom(selectedSchoolIdAtom);
  const [isFilterOpen, setIsFilterOpen] = useAtom(isFilterOpenAtom);

  const { data: schools = [] } = useQuery({
    queryKey: ['school'],
    queryFn: getAllSchools,
    select: response => response.data,
  });

  const handleValueChange = (value: string) => {
    setSelectedSchoolId(Number(value));

    onValueChange?.(value);
  };

  const searchedSchools = schools.filter(school =>
    school.school.toLowerCase().includes(searchValue.toLowerCase())
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
        placeholder="School"
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
        {searchedSchools.length === 0 ? (
          <VStack height="200px" alignItems="center" justify="center">
            <Text>No Results</Text>
          </VStack>
        ) : (
          searchedSchools
            .sort((a, b) => a.school.localeCompare(b.school))
            .map((school, index) => (
              <Select.Item
                key={school.id}
                value={String(school.id)}
                onKeyDown={e => {
                  if (
                    (index === 0 && e.key === 'ArrowUp') ||
                    (index === searchedSchools.length - 1 &&
                      e.key === 'ArrowDown')
                  ) {
                    textFieldRef.current?.focus();
                  }
                }}
              >
                {school.school}
              </Select.Item>
            ))
        )}
      </Select.Content>
    </Select.Root>
  );
}

export default SchoolFilter;
