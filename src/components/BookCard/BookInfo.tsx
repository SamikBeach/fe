import { AuthorAvatar } from '@components/AuthorAvatar';
import { MOCK_AUTHOR } from '@constants/mocks';
import { BookServerModel } from '@models/book';
import { HeartIcon } from '@radix-ui/react-icons';
import { Text } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import { css } from 'styled-system/css';
import { HStack } from 'styled-system/jsx';

interface Props {
  book: BookServerModel;
}

export default function BookInfo({ book }: Props) {
  const router = useRouter();

  return (
    <>
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
        <AuthorAvatar author={MOCK_AUTHOR} />
        <Text>프리드리히 니체</Text>
      </HStack>
      <Text>박찬국</Text>
      <Text>책세상</Text>
      <Text>2013년 출간</Text>
      <Text>
        consectetur, nunc ac ultricies ultricies, odio turpis consectetur (기타
        알라딘에서 제공하는 정보)
      </Text>
    </>
  );
}
