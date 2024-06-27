import { BookServerModel } from '@models/book';
import { Card, Text } from '@radix-ui/themes';
import classNames from 'classnames';
import { ComponentProps } from 'react';
import { css } from 'styled-system/css';
import { HStack, VStack } from 'styled-system/jsx';
import { AuthorAvatar } from '..';
import { HeartIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';

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
          <HStack justify="space-between" width="100%">
            <Text
              size="4"
              weight="bold"
              onClick={() => router.push(`/book/${book.id}`)}
              className={css({ cursor: 'pointer' })}
            >
              차라투스트라는 이렇게 말했다
            </Text>

            <HStack>
              <HStack gap="0">
                <Text>123</Text>
                <HeartIcon color="red" />
              </HStack>
              <Text>362 comments</Text>
            </HStack>
          </HStack>
          <HStack>
            <AuthorAvatar
              author={{
                id: 1,
                name: 'Friedrich Nietzsche',
                name_in_kor: '프리드리히 니체',
                born_date: '1844-10-15',
                born_date_is_bc: null,
                died_date: '1900-08-25',
                died_date_is_bc: null,
                image_url:
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Nietzsche187a.jpg/472px-Nietzsche187a.jpg',
                influenced: [],
                influenced_by: [],
                writing: [],
                book: [],
              }}
            />
            <Text>프리드리히 니체</Text>
          </HStack>
          <Text>박찬국</Text>
          <Text>책세상</Text>
          <Text>2013년 출간</Text>
          <Text>
            consectetur, nunc ac ultricies ultricies, odio turpis consectetur
            (기타 알라딘에서 제공하는 정보)
          </Text>
          <Text weight="bold">related writings</Text>
          <HStack
            className={css({ cursor: 'pointer' })}
            onClick={() => router.push(`/writing/${3}`)}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg/440px-Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg"
              height={50}
              width={40}
            />
            <Text>Also Sprach Zarathustra</Text>
          </HStack>
        </VStack>
      </HStack>
    </Card>
  );
}

export default BookCard;
