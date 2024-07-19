import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import { Spinner, Table, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { searchWritings } from '@apis/writing';
import { VStack } from 'styled-system/jsx';

interface Props {
  authorId?: number;
}

export default function WritingTable({ authorId }: Props) {
  const router = useRouter();
  const { data: writings = [], isLoading } = useQuery({
    queryKey: ['search/writing', authorId],
    queryFn: () => searchWritings({ authorId }),
    select: response => response.data.data,
  });

  if (isLoading) {
    return (
      <VStack justify="center" height="500px">
        <Spinner size="3" />
      </VStack>
    );
  }

  return (
    <Table.Root className={css({ width: '100%', py: '10px' })}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell width="140px">
            Publication date
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell width="100px">
            Editions
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {writings.map(
          ({ id, title, title_in_eng, publication_date, books }) => (
            <Table.Row
              key={id}
              className={css({
                cursor: 'pointer',
                _hover: {
                  backgroundColor: 'gray.50',
                },
              })}
              align="center"
              onClick={() => router.push(`/writing/${id}`)}
            >
              <Table.Cell>
                <VStack gap="0px" alignItems="start">
                  <Text weight="bold">{title}</Text>
                  <Text>{title_in_eng}</Text>
                </VStack>
              </Table.Cell>
              <Table.Cell>{publication_date}</Table.Cell>
              <Table.Cell>
                <Text weight={books.length > 0 ? 'bold' : 'regular'}>
                  {books.length} Editions
                </Text>
              </Table.Cell>
            </Table.Row>
          )
        )}
      </Table.Body>
    </Table.Root>
  );
}
