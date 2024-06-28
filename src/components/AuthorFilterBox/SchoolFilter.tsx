import { getAllSchools } from '@apis/school';
import { selectedSchoolIdAtom } from '@atoms/filter';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { css } from 'styled-system/css';

function SchoolFilter() {
  const setSelectedSchoolId = useSetAtom(selectedSchoolIdAtom);

  const { data: school = [] } = useQuery({
    queryKey: ['school'],
    queryFn: getAllSchools,
    select: response => response.data,
  });

  return (
    <Select.Root onValueChange={value => setSelectedSchoolId(Number(value))}>
      <Select.Trigger
        className={css({
          cursor: 'pointer',
          zIndex: 2,
        })}
        placeholder="Pick an school"
      />
      <Select.Content side="bottom" position="popper">
        <Select.Group>
          <Select.Label>School</Select.Label>
          {school
            .sort((a, b) => a.school.localeCompare(b.school))
            .map(_school => (
              <Select.Item key={_school.id} value={String(_school.id)}>
                {_school.school}
              </Select.Item>
            ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default SchoolFilter;
