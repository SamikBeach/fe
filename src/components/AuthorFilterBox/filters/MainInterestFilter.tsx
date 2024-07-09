import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { ComponentProps } from 'react';
import { Filter } from '../Filter';
import { FilterType } from '../Filter/models';
import { getAllMainInterests } from '@apis/main-interest';

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
    <Filter
      items={mainInterests}
      filterType={FilterType.MainInterest}
      {...props}
    />
  );
}

export default MainInterestFilter;
