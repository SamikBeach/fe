import { BookServerModel } from '@models/book';
import { Card } from '@radix-ui/themes';
import classNames from 'classnames';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';
import { VStack } from 'styled-system/jsx';
import BookAdditionalInfo from './BookAdditionalInfo';
import BookBasicInfo from './BookBasicInfo';

interface Props extends ComponentProps<typeof Card> {
  book: BookServerModel;
}

function BookCard({ book, className, ...props }: Props) {
  return (
    <Card
      className={classNames(
        css({
          width: '460px',
          height: '290px',
          padding: '20px',
        }),
        className
      )}
      {...props}
    >
      <VStack gap="6px" alignItems="start">
        <BookBasicInfo book={book} />
        <BookAdditionalInfo book={book} />
      </VStack>
    </Card>
  );
}

export default BookCard;
