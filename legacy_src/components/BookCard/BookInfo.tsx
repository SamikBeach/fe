import AuthorHoverCard from 'legacy_src/components/AuthorHoverCard/AuthorHoverCard';
import { WritingHoverCard } from 'legacy_src/components/WritingHoverCard';
import { BookServerModel } from 'legacy_src/models/book';
import { Text } from '@radix-ui/themes';
import { format } from 'date-fns';
import Link from 'next/link';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface Props {
  book: BookServerModel;
}

export default function BookInfo({ book }: Props) {
  const {
    authors,
    writings = [],
    info: { title, pubDate, publisher, description },
  } = book;

  return (
    <HStack alignItems="start" gap="30px" py="10px" px="16px">
      <VStack alignItems="start" gap="0">
        <Link href={`/book/${book.id}`}>
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
        <HStack className={css({ cursor: 'pointer' })} gap="4px">
          {writings.map((writing, index) => (
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
              {index === writings.length - 1 ? null : ' / '}
            </>
          ))}
        </HStack>
        {authors.map(_author => (
          <AuthorHoverCard.Root key={_author.id}>
            <AuthorHoverCard.Trigger>
              <Link href={`/author/${_author.id}`}>
                <HStack gap="4px">
                  <Text
                    size="3"
                    mt="4px"
                    className={css({
                      cursor: 'pointer',
                      _hover: { textDecoration: 'underline' },
                    })}
                  >
                    {_author.name}
                  </Text>
                </HStack>
              </Link>
            </AuthorHoverCard.Trigger>
            <AuthorHoverCard.Content author={_author} side="right" />
          </AuthorHoverCard.Root>
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
          mt="4px"
          className={css({
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineClamp: 2,
          })}
        >
          {description.replaceAll(/&lt;/g, '<').replaceAll(/&gt;/g, '>')}
        </Text>
      </VStack>
    </HStack>
  );
}
