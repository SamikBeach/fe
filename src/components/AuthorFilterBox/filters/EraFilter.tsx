import { getAllEras } from '@apis/era';
import { selectedEraIdAtom } from '@atoms/filter';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';

interface Props extends ComponentProps<typeof Select.Root> {}

function EraFilter({ onValueChange, ...props }: Props) {
  const setSelectedEraId = useSetAtom(selectedEraIdAtom);

  const { data: eras = [] } = useQuery({
    queryKey: ['era'],
    queryFn: getAllEras,
    select: response => response.data,
  });

  const handleValueChange = (value: string) => {
    setSelectedEraId(Number(value));

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
        placeholder="Era"
      />
      <Select.Content side="bottom" position="popper">
        <Select.Group>
          <Select.Label>Era</Select.Label>
          {eras
            .sort((a, b) => a.era.localeCompare(b.era))
            .map(era => (
              <Select.Item
                key={era.id}
                value={String(era.id)}
                className={css({
                  _focus: {
                    backgroundColor: 'gray.100',
                    color: 'black',
                  },
                })}
              >
                {era.era}
              </Select.Item>
            ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default EraFilter;
