import { getAllRegions } from '@apis/region';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { css } from 'styled-system/css';

function RegionFilter() {
  const { data: region = [] } = useQuery({
    queryKey: ['region'],
    queryFn: getAllRegions,
    select: response => response.data,
  });

  return (
    <Select.Root>
      <Select.Trigger
        className={css({
          cursor: 'pointer',
          zIndex: 2,
        })}
        placeholder="Pick a region"
      />
      <Select.Content side="bottom" position="popper">
        <Select.Group>
          <Select.Label>Region</Select.Label>
          {region
            .sort((a, b) => a.region.localeCompare(b.region))
            .map(_region => (
              <Select.Item value={_region.region}>{_region.region}</Select.Item>
            ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default RegionFilter;
