import { getAllNationalities } from '@apis/nationality';
import { selectedNationalityIdAtom } from '@atoms/filter';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';

interface Props extends ComponentProps<typeof Select.Root> {}

function NationalityFilter({ onValueChange, ...props }: Props) {
  const setSelectedNationalityId = useSetAtom(selectedNationalityIdAtom);

  const { data: nationalities = [] } = useQuery({
    queryKey: ['nationality'],
    queryFn: getAllNationalities,
    select: response => response.data,
  });

  const handleValueChange = (value: string) => {
    setSelectedNationalityId(Number(value));

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
        placeholder="Pick a nationality"
      />
      <Select.Content side="bottom" position="popper">
        <Select.Group>
          <Select.Label>Nationality</Select.Label>
          {nationalities
            .sort((a, b) => a.nationality.localeCompare(b.nationality))
            .map(nationality => (
              <Select.Item key={nationality.id} value={String(nationality.id)}>
                {nationality.nationality}
              </Select.Item>
            ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default NationalityFilter;
