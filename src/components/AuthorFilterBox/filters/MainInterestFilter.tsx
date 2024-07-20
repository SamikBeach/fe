import { Select, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { ComponentProps } from 'react';
import { Filter } from '@components/Filter';
import { getAllMainInterests } from '@apis/main-interest';
import { VStack } from 'styled-system/jsx';
import { FilterType } from '@models/filter';

interface Props extends ComponentProps<typeof Select.Root> {}

function MainInterestFilter({ onValueChange, ...props }: Props) {
  const { data: mainInterests = [] } = useQuery({
    queryKey: ['mainInterest'],
    queryFn: getAllMainInterests,
    select: response =>
      response.data.map(mainInterest => ({
        id: mainInterest.id,
        value: mainInterest.main_interest,
      })),
  });

  return (
    <VStack alignItems="start" width="100%" gap="2px">
      <Text ml="4px" size="2">
        Main interest
      </Text>
      <Filter
        items={mainInterests}
        filterType={FilterType.MainInterest}
        {...props}
      />
    </VStack>
  );
}

export default MainInterestFilter;
