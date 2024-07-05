import { AuthorAvatar } from '@components/AuthorAvatar';
import { BookServerModel } from '@models/book';
import { Text } from '@radix-ui/themes';
import { format } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface Props {
  book: BookServerModel;
}

export default function BookInfo({ book }: Props) {
  const router = useRouter();

  const {
    authors,
    info: { title, cover, pubDate, publisher, description },
  } = book;

  return (
    <HStack alignItems="start" gap="20px">
      <img
        src={cover}
        height={140}
        width={100}
        className={css({ cursor: 'pointer' })}
        onClick={() => router.push(`/book/${book.id}`)}
      />
      <VStack alignItems="start" gap="0">
        <Link href={`/author/${book.id}`}>
          <Text
            size="4"
            weight="bold"
            className={css({
              cursor: 'pointer',
              _hover: { textDecoration: 'underline' },
            })}
          >
            {title}
          </Text>
        </Link>
        {authors.map(_author => (
          <Link href={`/author/${_author.id}`}>
            <HStack gap="4px">
              <Text
                className={css({
                  cursor: 'pointer',
                  _hover: { textDecoration: 'underline' },
                })}
              >
                {_author.name}
              </Text>
              <AuthorAvatar size="1" key={_author.id} author={_author} />
            </HStack>
          </Link>
        ))}
        <Text size="2" color="gray">
          {publisher}
        </Text>
        <Text size="2" color="gray">
          {format(new Date(pubDate), 'y년 M월 d일')}
        </Text>
        <Text
          size="2"
          color="gray"
          className={css({
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineClamp: 2,
          })}
        >
          {description}
        </Text>
      </VStack>
    </HStack>
  );
}