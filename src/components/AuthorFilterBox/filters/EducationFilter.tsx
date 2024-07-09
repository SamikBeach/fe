import { getAllEducations } from '@apis/education';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { ComponentProps } from 'react';
import { Filter } from '../Filter';
import { FilterType } from '../Filter/models';

interface Props extends ComponentProps<typeof Select.Root> {}

function EducationFilter({ onValueChange, ...props }: Props) {
  const { data: educations = [] } = useQuery({
    queryKey: ['education'],
    queryFn: getAllEducations,
    select: response =>
      response.data.map(education => ({
        id: education.id,
        value: education.education,
      })),
  });

  return (
    <Filter items={educations} filterType={FilterType.Education} {...props} />
  );
}

export default EducationFilter;
