import { getAllNationalities } from '@apis/nationality';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { ComponentProps } from 'react';
import { Filter } from '../Filter';
import { FilterType } from '../Filter/models';

interface Props extends ComponentProps<typeof Select.Root> {}

function NationalityFilter({ onValueChange, ...props }: Props) {
  const { data: nationalitys = [] } = useQuery({
    queryKey: ['nationality'],
    queryFn: getAllNationalities,
    select: response =>
      response.data.map(nationality => ({
        id: nationality.id,
        value: nationality.nationality,
      })),
  });

  return (
    <Filter
      items={nationalitys}
      filterType={FilterType.Nationality}
      {...props}
    />
  );
}

export default NationalityFilter;
