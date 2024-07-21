import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import { Spinner, Table } from '@radix-ui/themes';
import { format } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { searchBooks } from '@apis/book';
import { VStack } from 'styled-system/jsx';

interface Props {
  authorId?: number;
}

export default function BookTable({ authorId }: Props) {
  const router = useRouter();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ['search/book', authorId],
    queryFn: () =>
      searchBooks({
        take: 10,
        authorIds: authorId !== undefined ? [authorId] : undefined,
      }),
    select: response => response.data.data,
  });

  if (isLoading) {
    return (
      <VStack justify="center" height="500px" width="100%">
        <Spinner size="3" />
      </VStack>
    );
  }

  return (
    <Table.Root className={css({ width: '100%', py: '10px' })}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell width="200px"></Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell width="140px">
            Publication date
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell width="420px">
            Author & Translator
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {books.map(({ id, info }) => (
          <Table.Row
            key={id}
            className={css({
              cursor: 'pointer',
              _hover: {
                backgroundColor: 'gray.50',
              },
            })}
            align="center"
            onClick={() => router.push(`/book/${id}`)}
          >
            <Table.RowHeaderCell>
              <img src={info.cover} width={200} height={60} />
            </Table.RowHeaderCell>
            <Table.Cell>{info.title}</Table.Cell>
            <Table.Cell>
              {format(new Date(info.pubDate), 'y년 M월 d일')}
            </Table.Cell>
            <Table.Cell>{info.author}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
