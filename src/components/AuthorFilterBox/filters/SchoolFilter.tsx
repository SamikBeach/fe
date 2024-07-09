import { getAllSchools } from '@apis/school';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { ComponentProps } from 'react';
import { Filter } from '../Filter';
import { FilterType } from '../Filter/models';

interface Props extends ComponentProps<typeof Select.Root> {}

function SchoolFilter({ onValueChange, ...props }: Props) {
  const { data: schools = [] } = useQuery({
    queryKey: ['school'],
    queryFn: getAllSchools,
    select: response =>
      response.data.map(school => ({
        id: school.id,
        value: school.school,
      })),
  });

  return <Filter items={schools} filterType={FilterType.School} {...props} />;
}

export default SchoolFilter;
