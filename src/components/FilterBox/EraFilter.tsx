import { getAllEras } from '@apis/era';
import { selectedEraIdAtom } from '@atoms/filter';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { css } from 'styled-system/css';

function EraFilter() {
  const setSelectedEraId = useSetAtom(selectedEraIdAtom);

  const { data: era = [] } = useQuery({
    queryKey: ['era'],
    queryFn: getAllEras,
    select: response => response.data,
  });

  return (
    <Select.Root onValueChange={value => setSelectedEraId(Number(value))}>
      <Select.Trigger
        className={css({
          cursor: 'pointer',
          zIndex: 2,
        })}
        placeholder="Pick an era"
      />
      <Select.Content side="bottom" position="popper">
        <Select.Group>
          <Select.Label>Era</Select.Label>
          {era
            .sort((a, b) => a.era.localeCompare(b.era))
            .map(_era => (
              <Select.Item key={_era.id} value={String(_era.id)}>
                {_era.era}
              </Select.Item>
            ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default EraFilter;
