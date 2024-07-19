import { Tabs } from '@radix-ui/themes';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';
import WritingTable from './WritingTable';
import BookTable from './BookTable';
import { AuthorServerModel } from '@models/author';

interface Props extends ComponentProps<typeof Tabs.Root> {
  author: AuthorServerModel;
}

export default function WritingAndBookInfo({ author, ...props }: Props) {
  return (
    <Tabs.Root defaultValue="originals" {...props}>
      <Tabs.List size="2">
        <Tabs.Trigger
          value="originals"
          className={css({ fontSize: '16px', cursor: 'pointer' })}
        >
          Originals
        </Tabs.Trigger>
        <Tabs.Trigger
          value="books"
          className={css({ fontSize: '16px', cursor: 'pointer' })}
        >
          Books
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="originals">
        <WritingTable authorId={author.id} />
      </Tabs.Content>
      <Tabs.Content value="books">
        <BookTable authorId={author.id} />
      </Tabs.Content>
    </Tabs.Root>
  );
}
