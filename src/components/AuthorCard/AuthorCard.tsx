import { AuthorServerModel } from '@models/author';
import { Avatar, Card } from '@radix-ui/themes';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';
import InfluencedByList from './InfluencedByList';
import InfluencedList from './InfluencedList';
import WritingList from './WritingList';
import BookList from './BookList';
import AuthorInfo from './AuthorInfo';

interface Props extends ComponentProps<typeof Card> {
  author: AuthorServerModel;
}

function AuthorCard({ author, className, onClick, ...props }: Props) {
  const router = useRouter();

  const {
    influenceds = [],
    influenced_bys = [],
    writings = [],
    books = [],
  } = author;

  if (author === undefined) {
    return null;
  }

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
      onClick={e => {
        router.push(`/author/${author.id}`);

        onClick?.(e);
      }}
      {...props}
    >
      <HStack alignItems="start" gap="20px">
        <Avatar
          src={author.image_url ?? undefined}
          fallback="폴백"
          radius="full"
          size="7"
        />
        <VStack alignItems="start" gap="0" width="100%">
          <AuthorInfo author={author} />
          <VStack alignItems="start">
            <WritingList writings={writings} />
            <BookList books={books} />
          </VStack>
          <VStack gap="10px" alignItems="start">
            <InfluencedList influenceds={influenceds} />
            <InfluencedByList influencedBys={influenced_bys} />
          </VStack>
        </VStack>
      </HStack>
    </Card>
  );
}

export default AuthorCard;
