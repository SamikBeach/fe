import { getAllSchools } from '@apis/school';
import { selectedSchoolIdAtom } from '@atoms/filter';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Select, TextField, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { ComponentProps, useRef, useState } from 'react';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';

interface Props extends ComponentProps<typeof Select.Root> {}

function SchoolFilter({ onValueChange, ...props }: Props) {
  const [searchValue, setSearchValue] = useState('');

  const textFieldRef = useRef<HTMLInputElement>(null);

  const setSelectedSchoolId = useSetAtom(selectedSchoolIdAtom);

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
        placeholder="School"
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
          placeholder="Search school..."
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
