import { ScrollArea, SegmentedControl } from '@radix-ui/themes';
import { Dispatch, SetStateAction, useState } from 'react';
import WritingTable from './WritingTable';
import BookList from './BookList';
import { AuthorServerModel } from '@models/author';
import { VStack, VstackProps } from 'styled-system/jsx';
import { css } from 'styled-system/css';

interface Props extends VstackProps {
  author: AuthorServerModel;
  selectedWritingId: number | null;
  setSelectedWritingId: Dispatch<SetStateAction<number | null>>;
  selectedBookId: number | null;
  setSelectedBookId: Dispatch<SetStateAction<number | null>>;
}

export default function WritingAndBookInfo({
  author,
  selectedWritingId,
  setSelectedWritingId,
  selectedBookId,
  setSelectedBookId,
  ...props
}: Props) {
  const [selected, setSelected] = useState<'originals' | 'books'>('originals');

  return (
    <VStack
      alignItems="start"
      pt="10px"
      height="100%"
      width="100%"
      gap="4px"
      {...props}
    >
      <SegmentedControl.Root
        defaultValue="originals"
        onValueChange={value => setSelected(value as 'originals' | 'books')}
      >
        <SegmentedControl.Item value="originals">
          Originals
        </SegmentedControl.Item>
        <SegmentedControl.Item value="books">Books</SegmentedControl.Item>
      </SegmentedControl.Root>

      <ScrollArea
        className={css({
          height: '100%',
          pr: '8px',
        })}
      >
        {selected === 'originals' ? (
          <WritingTable
            authorId={author.id}
            selectedWritingId={selectedWritingId}
            setSelectedWritingId={setSelectedWritingId}
          />
        ) : (
          <BookList
            authorId={author.id}
            selectedBookId={selectedBookId}
            setSelectedBookId={setSelectedBookId}
          />
        )}
      </ScrollArea>
    </VStack>
  );
}
