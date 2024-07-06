import { WritingServerModel } from '@models/writing';
import { Dispatch, SetStateAction } from 'react';
import { ScrollArea, Table } from '@radix-ui/themes';
import { css } from 'styled-system/css';
import { WritingSidePeek } from './WritingSidePeek';

interface WritingInfoProps {
  writings: WritingServerModel[];
  selectedWritingId: number | null;
  setSelectedWritingId: Dispatch<SetStateAction<number | null>>;
}

function WritingInfo({
  writings,
  selectedWritingId,
  setSelectedWritingId,
}: WritingInfoProps) {
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
                onClick={() => setSelectedWritingId(id)}
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
      </ScrollArea>
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

export default WritingInfo;
