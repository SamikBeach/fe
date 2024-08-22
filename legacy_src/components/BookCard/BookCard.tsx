import { BookServerModel } from 'legacy_src/models/book';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';
import { Link, Text } from '@radix-ui/themes';
import { AuthorAvatar, WritingHoverCard } from '..';
import { format } from 'date-fns';

interface Props {
  book: BookServerModel;
}

function BookCard({ book }: Props) {
  const router = useRouter();

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
    >
      <img
        src={cover}
        width={140}
        height={200}
        className={css({
          cursor: 'pointer',
          borderLeftRadius: '6px',
          height: '200px',
          width: '140px',
        })}
        onClick={() => router.push(`/book/${book.id}`)}
      />
      <VStack alignItems="start" gap="2px" padding="14px">
        <Text weight="bold" size="4">
          {title}
        </Text>
        {authors.map(author => (
          <HStack key={author.id} gap="4px">
            <AuthorAvatar author={author} size="1" />
            <Text
              className={css({
                cursor: 'pointer',

                _hover: { textDecoration: 'underline' },
              })}
              onClick={() => router.push(`/author/${author.id}`)}
            >
              {author.name}
            </Text>
          </HStack>
        ))}
        <Text>{format(new Date(pubDate), 'yyyy MMMM dd')}</Text>
        <Text>{publisher}</Text>
        {writings.map(writing => (
          <>
            <WritingHoverCard.Root key={writing.id}>
              <WritingHoverCard.Trigger>
                <Link href={`/writing/${writing.id}`}>
                  <Text
                    className={css({
                      cursor: 'pointer',
                      _hover: { textDecoration: 'underline' },
                    })}
                  >
                    {writing.title}
                  </Text>
                </Link>
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
