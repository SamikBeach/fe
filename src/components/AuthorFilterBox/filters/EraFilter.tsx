import { getAllEras } from '@apis/era';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { ComponentProps } from 'react';
import { Filter } from '../Filter';
import { FilterType } from '../Filter/models';

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

  return <Filter items={eras} filterType={FilterType.Era} {...props} />;
}

export default EraFilter;
