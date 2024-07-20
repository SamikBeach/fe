import { Select, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { ComponentProps } from 'react';
import { Filter } from '@components/Filter';
import { FilterType } from '@components/Filter/models';
import { getAllMainInterests } from '@apis/main-interest';
import { VStack } from 'styled-system/jsx';

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
