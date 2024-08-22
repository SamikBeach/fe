import { getAllNationalities } from 'legacy_src/apis/nationality';
import { Select, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { ComponentProps } from 'react';
import { VStack } from 'styled-system/jsx';
import { Filter } from 'legacy_src/components/Filter';
import { FilterType } from 'legacy_src/models/filter';

interface Props extends ComponentProps<typeof Select.Root> {}

function NationalityFilter({ onValueChange, ...props }: Props) {
  const { data: nationalties = [] } = useQuery({
    queryKey: ['nationality'],
    queryFn: getAllNationalities,
    select: response =>
      response.data.map(nationality => ({
        id: nationality.id,
        value: nationality.nationality,
      })),
  });

  return (
    <VStack alignItems="start" width="100%" gap="2px">
      <Text ml="4px" size="2">
        Nationality
      </Text>
      <Filter
        items={nationalties}
        filterType={FilterType.Nationality}
        {...props}
      />
    </VStack>
  );
}

export default NationalityFilter;
