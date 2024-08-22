import { SegmentedControl } from '@radix-ui/themes';
import { useState } from 'react';
import WritingTable from './WritingTable';
import BookTable from './BookList';
import { AuthorServerModel } from 'legacy_src/models/author';
import { VStack, VstackProps } from 'styled-system/jsx';

interface Props extends VstackProps {
  author: AuthorServerModel;
}

export default function WritingAndBookInfo({ author, ...props }: Props) {
  const [selected, setSelected] = useState<'originals' | 'books'>('originals');

  return (
    <VStack alignItems="start" gap="10px" pt="20px" {...props}>
      <SegmentedControl.Root
        defaultValue="originals"
        onValueChange={value => setSelected(value as 'originals' | 'books')}
      >
        <SegmentedControl.Item value="originals">
          Originals
        </SegmentedControl.Item>
        <SegmentedControl.Item value="books">Books</SegmentedControl.Item>
      </SegmentedControl.Root>
      {selected === 'originals' ? (
        <WritingTable authorId={author.id} />
      ) : (
        <BookTable authorId={author.id} />
      )}
    </VStack>
  );
}
