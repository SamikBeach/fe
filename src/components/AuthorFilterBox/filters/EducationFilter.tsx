import { getAllEducations } from '@apis/education';
import { isFilterOpenAtom, selectedEducationIdAtom } from '@atoms/filter';
import { Select, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { ComponentProps, useRef, useState } from 'react';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';
import SearchTextField from './SearchTextField';

interface Props extends ComponentProps<typeof Select.Root> {}

function EducationFilter({ onValueChange, ...props }: Props) {
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);

  const textFieldRef = useRef<HTMLInputElement>(null);

  const setSelectedEducationId = useSetAtom(selectedEducationIdAtom);
  const [isFilterOpen, setIsFilterOpen] = useAtom(isFilterOpenAtom);

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
        placeholder="Education"
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
