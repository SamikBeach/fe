import { BookServerModel } from '@models/book';
import { css } from 'styled-system/css';
import { HStack, HstackProps, VStack } from 'styled-system/jsx';
import { Text } from '@radix-ui/themes';
import { format } from 'date-fns';
import { WritingHoverCard } from '@components/WritingHoverCard';

interface Props extends HstackProps {
  book: BookServerModel;
}

function BookCard({ book, ...props }: Props) {
  const {
    info: { cover, title, pubDate, publisher },
    authors,
    writings,
  } = book;

  return (
    <HStack
      alignItems="start"
      width="100%"
      borderRadius="8px"
      backgroundColor="white"
      {...props}
    >
      <img
        src={cover}
        width={70}
        height={100}
        className={css({
          cursor: 'pointer',
          borderLeftRadius: '6px',
          width: '70px',
          height: '100px',
        })}
      />
      <VStack alignItems="start" gap="2px" padding="2px">
        <Text weight="bold" size="3">
          {title}
        </Text>
        {authors.map(author => (
          <HStack key={author.id} gap="4px">
            <Text
              className={css({
                cursor: 'pointer',

                _hover: { textDecoration: 'underline' },
              })}
              size="2"
            >
              {author.name}
            </Text>
          </HStack>
        ))}
        <Text size="1">{format(new Date(pubDate), 'yyyy MMMM dd')}</Text>
        <Text size="1">{publisher}</Text>
        {writings.map(writing => (
          <>
            <WritingHoverCard.Root key={writing.id}>
              <WritingHoverCard.Trigger>
                <Text
                  className={css({
                    cursor: 'pointer',

                    _hover: { textDecoration: 'underline' },
                  })}
                  size="1"
                >
                  {writing.title}
                </Text>
              </WritingHoverCard.Trigger>
              <WritingHoverCard.Content
                side="right"
                writing={{ ...writing, author: authors[0] }}
              />
            </WritingHoverCard.Root>
          </>
        ))}
      </VStack>
    </HStack>
  );
}

export default BookCard;
