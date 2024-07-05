import { WritingHoverCard } from '@components/WritingHoverCard';
import { BookServerModel } from '@models/book';
import { Text } from '@radix-ui/themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface Props {
  book: BookServerModel;
}

export default function BookAdditionalInfo({ book }: Props) {
  const router = useRouter();

  const { writings = [], authors } = book;

  return (
    <VStack gap="0" alignItems="start">
      <Text size="3" weight="medium">
        Related writings
      </Text>
      <HStack className={css({ cursor: 'pointer' })}>
        {writings.map((writing, index) => (
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
                  {index !== writings.length - 1 && ', '}
                </Text>
              </Link>
            </WritingHoverCard.Trigger>
            <WritingHoverCard.Content
              side="top"
              writing={{ ...writing, author: authors[0] }}
            />
          </WritingHoverCard.Root>
        ))}
      </HStack>
    </VStack>
  );
}
