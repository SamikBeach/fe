import { getAllRegions } from 'legacy_src/apis/region';
import { Select, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { ComponentProps } from 'react';
import { VStack } from 'styled-system/jsx';
import { Filter } from 'legacy_src/components/Filter';
import { FilterType } from 'legacy_src/models/filter';

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

  return (
    <VStack alignItems="start" width="100%" gap="2px">
      <Text ml="4px" size="2">
        Region
      </Text>
      <Filter items={regions} filterType={FilterType.Region} {...props} />
    </VStack>
  );
}

export default RegionFilter;
