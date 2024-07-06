import { BookServerModel } from '@models/book';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import { ScrollArea, Table } from '@radix-ui/themes';
import { format } from 'date-fns';

interface Props {
  books?: BookServerModel[];
}

export default function BookTable({ books = [] }: Props) {
  const router = useRouter();

  if (books.length === 0) {
    return null;
  }

  return (
    <ScrollArea type="always" scrollbars="vertical">
      <Table.Root className={css({ width: '100%' })}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell width="60px"></Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell maxWidth="80px">
              Publication date
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell maxWidth="60px">
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
                <img src={info.cover} width={40} height={60} />
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
    </ScrollArea>
  );
}
