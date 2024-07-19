import { getAllSchools } from '@apis/school';
import { Select, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { ComponentProps } from 'react';
import { Filter } from '../Filter';
import { FilterType } from '../Filter/models';
import { VStack } from 'styled-system/jsx';

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

  return (
    <VStack alignItems="start" width="100%" gap="2px">
      <Text ml="4px" size="2">
        School
      </Text>
      <Filter items={schools} filterType={FilterType.School} {...props} />
    </VStack>
  );
}

export default SchoolFilter;
