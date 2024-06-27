import { BookServerModel } from '@models/book';
import { Card, Text } from '@radix-ui/themes';
import classNames from 'classnames';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';

interface Props extends ComponentProps<typeof Card> {
  book: BookServerModel;
}

function BookCard({ book, className, ...props }: Props) {
  return (
    <Card
      className={classNames(
        css({
          height: '300px',
          padding: '20px',
          cursor: 'pointer',
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
        />
        <VStack alignItems="start" gap="0">
          <Text size="4" weight="bold">
            {book.isbn}
          </Text>
        </VStack>
      </HStack>
    </Card>
  );
}

export default BookCard;
