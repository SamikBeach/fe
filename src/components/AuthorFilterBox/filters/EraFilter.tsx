import { getAllEras } from '@apis/era';
import { Select, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { ComponentProps } from 'react';
import { Filter } from '../Filter2';
import { FilterType } from '../Filter2/models';
import { VStack } from 'styled-system/jsx';

interface Props extends ComponentProps<typeof Select.Root> {}

function EraFilter({ onValueChange, ...props }: Props) {
  const { data: eras = [] } = useQuery({
    queryKey: ['era'],
    queryFn: getAllEras,
    select: response =>
      response.data.map(era => ({
        id: era.id,
        value: era.era,
      })),
  });

  return (
    <VStack alignItems="start" width="100%" gap="2px">
      <Text ml="4px" size="2">
        Era
      </Text>
      <Filter items={eras} filterType={FilterType.Era} {...props} />
    </VStack>
  );
}

export default EraFilter;
