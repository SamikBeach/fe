import { BookServerModel } from '@models/book';
import { Dispatch, SetStateAction } from 'react';
import { BookSidePeek } from './BookSidePeek';
import { ScrollArea, Table } from '@radix-ui/themes';
import { css } from 'styled-system/css';

import { format } from 'date-fns';

interface Props {
  selectedBookId: number | null;
  setSelectedBookId: Dispatch<SetStateAction<number | null>>;
  books: BookServerModel[];
}

function BookTable({ selectedBookId, setSelectedBookId, books }: Props) {
  return (
    <>
      <ScrollArea type="always" scrollbars="vertical">
        <Table.Root className={css({ width: '100%' })}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell width="80px"></Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell width="140px">
                Publication date
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell width="200px">
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
                onClick={() => setSelectedBookId(id)}
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
      <BookSidePeek
        bookId={selectedBookId ?? 0}
        open={selectedBookId !== null}
        onOpenChange={open => setSelectedBookId(open ? selectedBookId : null)}
      />
    </>
  );
}

export default BookTable;
