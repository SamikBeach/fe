import { getAllEducations } from 'legacy_src/apis/education';
import { Filter } from 'legacy_src/components/Filter';
import { FilterType } from 'legacy_src/models/filter';
import { Select, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { ComponentProps } from 'react';
import { VStack } from 'styled-system/jsx';

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
    <VStack alignItems="start" width="100%" gap="2px">
      <Text ml="4px" size="2">
        Education
      </Text>
      <Filter items={educations} filterType={FilterType.Education} {...props} />
    </VStack>
  );
}

export default EducationFilter;
