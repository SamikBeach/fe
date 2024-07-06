import { getAllEducations } from '@apis/education';
import { selectedEducationIdAtom } from '@atoms/filter';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Select, Text, TextField } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { ComponentProps, useRef, useState } from 'react';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';

interface Props extends ComponentProps<typeof Select.Root> {}

function EducationFilter({ onValueChange, ...props }: Props) {
  const [searchValue, setSearchValue] = useState('');

  const textFieldRef = useRef<HTMLInputElement>(null);

  const setSelectedEducationId = useSetAtom(selectedEducationIdAtom);

  const { data: educations = [] } = useQuery({
    queryKey: ['education'],
    queryFn: getAllEducations,
    select: response => response.data,
  });

  const handleValueChange = (value: string) => {
    setSelectedEducationId(Number(value));

    onValueChange?.(value);
  };

  const searchedEducations = educations.filter(education =>
    education.education.toLowerCase().includes(searchValue.toLowerCase())
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
        placeholder="Education"
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
          placeholder="Search education..."
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
        {searchedEducations.length === 0 ? (
          <VStack height="200px" alignItems="center" justify="center">
            <Text>No Results</Text>
          </VStack>
        ) : (
          searchedEducations
            .sort((a, b) => a.education.localeCompare(b.education))
            .map((education, index) => (
              <Select.Item
                key={education.id}
                value={String(education.id)}
                onKeyDown={e => {
                  if (
                    (index === 0 && e.key === 'ArrowUp') ||
                    (index === searchedEducations.length - 1 &&
                      e.key === 'ArrowDown')
                  ) {
                    textFieldRef.current?.focus();
                  }
                }}
              >
                {education.education}
              </Select.Item>
            ))
        )}
      </Select.Content>
    </Select.Root>
  );
}

export default EducationFilter;
