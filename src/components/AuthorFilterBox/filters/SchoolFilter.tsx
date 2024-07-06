import { getAllSchools } from '@apis/school';
import { selectedSchoolIdAtom } from '@atoms/filter';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';

interface Props extends ComponentProps<typeof Select.Root> {}

function SchoolFilter({ onValueChange, ...props }: Props) {
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

  return (
    <Select.Root onValueChange={handleValueChange} {...props}>
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
        <Select.Group>
          <Select.Label>School</Select.Label>
          {schools
            .sort((a, b) => a.school.localeCompare(b.school))
            .map(school => (
              <Select.Item key={school.id} value={String(school.id)}>
                {school.school}
              </Select.Item>
            ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default SchoolFilter;
