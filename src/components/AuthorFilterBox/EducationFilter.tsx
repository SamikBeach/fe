import { getAllEducations } from '@apis/education';
import { selectedEducationIdAtom } from '@atoms/filter';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { css } from 'styled-system/css';

function EducationFilter() {
  const setSelectedEducationId = useSetAtom(selectedEducationIdAtom);

  const { data: education = [] } = useQuery({
    queryKey: ['education'],
    queryFn: getAllEducations,
    select: response => response.data,
  });

  return (
    <Select.Root onValueChange={value => setSelectedEducationId(Number(value))}>
      <Select.Trigger
        className={css({
          cursor: 'pointer',
          zIndex: 2,
        })}
        placeholder="Pick an education"
      />
      <Select.Content side="bottom" position="popper">
        <Select.Group>
          <Select.Label>Education</Select.Label>
          {education
            .sort((a, b) => a.education.localeCompare(b.education))
            .map(_education => (
              <Select.Item key={_education.id} value={String(_education.id)}>
                {_education.education}
              </Select.Item>
            ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default EducationFilter;
