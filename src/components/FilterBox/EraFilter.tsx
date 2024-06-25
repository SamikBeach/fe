import { getAllEras } from '@apis/era';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { css } from 'styled-system/css';

function EraFilter() {
  const { data: era = [] } = useQuery({
    queryKey: ['era'],
    queryFn: getAllEras,
    select: response => response.data,
  });

  return (
    <Select.Root>
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
              <Select.Item value={_era.era}>{_era.era}</Select.Item>
            ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default EraFilter;
