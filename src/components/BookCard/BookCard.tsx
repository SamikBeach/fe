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
                  'data:image/webp;base64,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',
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
          <HStack>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg/440px-Also_sprach_Zarathustra._Ein_Buch_f%C3%BCr_Alle_und_Keinen._In_drei_Theilen.jpg"
              height={50}
              width={40}
            />
            <Text>Also SprachZarathustra</Text>
          </HStack>
        </VStack>
      </HStack>
    </Card>
  );
}

export default BookCard;
