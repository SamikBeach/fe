import { css } from 'styled-system/css';
import { Spinner, Table, Text } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { searchWritings } from '@apis/writing';
import { VStack } from 'styled-system/jsx';
import { WritingSidePeek } from '../WritingSidePeek';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  authorId?: number;
  selectedWritingId: number | null;
  setSelectedWritingId: Dispatch<SetStateAction<number | null>>;
}

export default function WritingTable({
  authorId,
  selectedWritingId,
  setSelectedWritingId,
}: Props) {
  const { data: writings = [], isLoading } = useQuery({
    queryKey: ['search/writing', authorId],
    queryFn: () =>
      searchWritings({ author: [{ id: authorId ?? 0, value: '' }] }),
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
    <>
      <Table.Root className={css({ width: '100%', py: '10px' })}>
        <Table.Header>
          <Table.Row className={css({ fontSize: '13px' })}>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell minWidth="80px">
              Pub. date
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell minWidth="96px">
              Editions
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {writings
            .sort((a, b) => b.books.length - a.books.length)
            .map(({ id, title, title_in_eng, publication_date, books }) => (
              <Table.Row
                key={id}
                className={css({
                  cursor: 'pointer',
                  height: '66px',
                  fontSize: '13px',

                  _hover: {
                    backgroundColor: 'gray.50',
                  },
                })}
                align="center"
                onClick={() => setSelectedWritingId(id)}
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
            ))}
        </Table.Body>
      </Table.Root>
      <WritingSidePeek
        writingId={selectedWritingId ?? 0}
        open={selectedWritingId !== null}
        onOpenChange={open =>
          setSelectedWritingId(open ? selectedWritingId : null)
        }
      />
    </>
  );
}
