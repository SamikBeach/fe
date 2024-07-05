import { getAllEducations } from '@apis/education';
import { selectedEducationIdAtom } from '@atoms/filter';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';

interface Props extends ComponentProps<typeof Select.Root> {}

function EducationFilter({ onValueChange, ...props }: Props) {
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

  return (
    <Select.Root onValueChange={handleValueChange} {...props}>
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
        className={css({ maxHeight: '400px' })}
      >
        <Select.Group>
          <Select.Label>Education</Select.Label>
          {educations
            .sort((a, b) => a.education.localeCompare(b.education))
            .map(education => (
              <Select.Item
                key={education.id}
                value={String(education.id)}
                className={css({
                  _focus: {
                    backgroundColor: 'gray.100',
                    color: 'black',
                  },
                })}
              >
                {education.education}
              </Select.Item>
            ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default EducationFilter;
