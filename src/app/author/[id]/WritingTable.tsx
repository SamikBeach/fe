import { WritingServerModel } from '@models/writing';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';
import { Link, Table, Text } from '@radix-ui/themes';

interface Props {
  writings?: WritingServerModel[];
}

export default function WritingTable({ writings = [] }: Props) {
  const router = useRouter();

  return (
    <HStack
      width="100%"
      alignItems="start"
      flexWrap="wrap"
      wordBreak="break-all"
      px="20px"
    >
      <Table.Root className={css({ width: '100%' })}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell width="80px"></Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width="140px">
              Publication date
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width="120px">
              Editions
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {writings.map(({ id, title, publication_date, books }) => (
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
              <Table.RowHeaderCell>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg/440px-Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg"
                  width={40}
                  height={60}
                />
              </Table.RowHeaderCell>
              <Table.Cell>{title}</Table.Cell>
              <Table.Cell>{publication_date}</Table.Cell>
              <Table.Cell>3 editions</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </HStack>
  );
}
