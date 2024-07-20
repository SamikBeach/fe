import { Select, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { ComponentProps } from 'react';

import { VStack } from 'styled-system/jsx';
import { getAllAuthors } from '@apis/author';
import { FilterType } from '@components/Filter/models';
import { Filter } from '@components/Filter';

interface Props extends ComponentProps<typeof Select.Root> {}

function AuthorFilter({ onValueChange, ...props }: Props) {
  const { data: authors = [] } = useQuery({
    queryKey: ['author'],
    queryFn: getAllAuthors,
    select: response =>
      response.data
        .filter(
          author =>
            author.writings?.length !== undefined && author.writings.length > 0
        )
        .map(author => ({
          id: author.id,
          value: author.name,
        })),
  });

  return (
    <VStack alignItems="start" width="100%" gap="2px">
      <Text ml="4px" size="2">
        Author
      </Text>
      <Filter items={authors} filterType={FilterType.Author} {...props} />
    </VStack>
  );
}

export default AuthorFilter;
