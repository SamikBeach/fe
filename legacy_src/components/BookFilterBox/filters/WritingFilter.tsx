import { Select, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { ComponentProps } from 'react';

import { VStack } from 'styled-system/jsx';
import { getAllWritings } from 'legacy_src/apis/writing';
import { Filter } from 'legacy_src/components/Filter';
import { FilterType } from 'legacy_src/models/filter';
import { useAtomValue } from 'jotai';
import { filterAtom } from 'legacy_src/atoms/filter';

interface Props extends ComponentProps<typeof Select.Root> {}

function WritingFilter({ onValueChange, ...props }: Props) {
  const selectedFilter = useAtomValue(filterAtom);

  const { data: writings = [] } = useQuery({
    queryKey: ['writing'],
    queryFn: getAllWritings,
    select: response =>
      response.data
        .filter(
          writing =>
            writing.books?.length !== undefined &&
            writing.books.length > 0 &&
            selectedFilter[FilterType.Author]
              ?.map(author => author.id)
              .includes(writing.author.id)
        )
        .map(writing => ({
          id: writing.id,
          value: writing.title,
        })),
  });

  return (
    <VStack alignItems="start" width="100%" gap="2px">
      <Text ml="4px" size="2">
        Writing
      </Text>
      <Filter items={writings} filterType={FilterType.Writing} {...props} />
    </VStack>
  );
}

export default WritingFilter;
