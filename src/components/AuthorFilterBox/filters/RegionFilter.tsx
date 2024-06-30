import { getAllRegions } from '@apis/region';
import { selectedRegionIdAtom } from '@atoms/filter';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { useSetAtom } from 'jotai';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';

interface Props extends ComponentProps<typeof Select.Root> {}

function RegionFilter({ onValueChange, ...props }: Props) {
  const setSelectedRegionId = useSetAtom(selectedRegionIdAtom);

  const { data: regions = [] } = useQuery({
    queryKey: ['region'],
    queryFn: getAllRegions,
    select: response => response.data,
  });

  const handleValueChange = (value: string) => {
    setSelectedRegionId(Number(value));

    onValueChange?.(value);
  };

  return (
    <Select.Root onValueChange={handleValueChange} {...props}>
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
          {regions
            .sort((a, b) => a.region.localeCompare(b.region))
            .map(region => (
              <Select.Item key={region.id} value={String(region.id)}>
                {region.region}
              </Select.Item>
            ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default RegionFilter;
