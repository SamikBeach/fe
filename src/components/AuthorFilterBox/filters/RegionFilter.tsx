import { getAllRegions } from '@apis/region';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { ComponentProps } from 'react';
import { Filter } from '../Filter';
import { FilterType } from '../Filter/models';

interface Props extends ComponentProps<typeof Select.Root> {}

function RegionFilter({ onValueChange, ...props }: Props) {
  const { data: regions = [] } = useQuery({
    queryKey: ['region'],
    queryFn: getAllRegions,
    select: response =>
      response.data.map(region => ({
        id: region.id,
        value: region.region,
      })),
  });

  return <Filter items={regions} filterType={FilterType.Region} {...props} />;
}

export default RegionFilter;
