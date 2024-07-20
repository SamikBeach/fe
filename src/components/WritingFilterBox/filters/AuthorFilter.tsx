import { Select, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { ComponentProps } from 'react';
import { Filter } from '../../Filter';
import { FilterType } from '../../Filter/models';
import { VStack } from 'styled-system/jsx';
import { getAllAuthors } from '@apis/author';

interface Props extends ComponentProps<typeof Select.Root> {}

function AuthorFilter({ onValueChange, ...props }: Props) {
  const { data: authors = [] } = useQuery({
    queryKey: ['author'],
    queryFn: getAllAuthors,
    select: response =>
      response.data.map(author => ({
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
