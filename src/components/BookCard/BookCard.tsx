import { BookServerModel } from '@models/book';
import { Card } from '@radix-ui/themes';
import classNames from 'classnames';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';
import { useRouter } from 'next/navigation';
import WritingInfo from './WritingInfo';
import BookInfo from './BookInfo';

interface Props extends ComponentProps<typeof Card> {
  book: BookServerModel;
}

function BookCard({ book, className, ...props }: Props) {
  const router = useRouter();

  return (
    <Card
      className={classNames(
        css({
          height: '300px',
          padding: '20px',
        }),
        className
      )}
      {...props}
    >
      <HStack alignItems="start" gap="20px">
        <img
          src="https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9788970132099.jpg"
          height={140}
          width={100}
          onClick={() => router.push(`/book/${book.id}`)}
          className={css({ cursor: 'pointer' })}
        />
        <VStack alignItems="start" gap="0">
          <BookInfo book={book} />
          <WritingInfo />
        </VStack>
      </HStack>
    </Card>
  );
}

export default BookCard;
